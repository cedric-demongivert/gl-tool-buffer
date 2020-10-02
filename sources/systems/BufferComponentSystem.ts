import { System } from '@cedric-demongivert/gl-tool-ecs'
import { Component } from '@cedric-demongivert/gl-tool-ecs'
import { Pack } from '@cedric-demongivert/gl-tool-collection'

import { BufferIdentifier } from '../BufferIdentifier'

import { Buffer } from '../components/Buffer'
import { BufferComponentType } from '../types/BufferComponentType'

import { BufferCollection } from './BufferCollection'

export class BufferComponentSystem extends System {
  /**
  * A set of all existing buffers.
  */
  public readonly buffers : BufferCollection

  /**
  * A sequence of shader identifier by entity.
  */
  private readonly _entityShaders : Pack<BufferIdentifier>

  /**
  * A sequence of component identifier by buffer.
  */
  private readonly _components : Pack<number>

  /**
  * Instantiate a new empty buffer component system.
  *
  * @param collection - The underlying buffer manager.
  */
  public constructor (collection : BufferCollection) {
    super()

    this.buffers = collection
    this._components = Pack.uint32(collection.capacity)
  }

  /**
  * @see System.initialize
  */
  public initialize () : void {
    for (const entity of this.manager.getEntitiesWithType(BufferComponentType)) {
      this.onBufferComponentAddition(
        this.manager.getComponentOfEntity(entity, BufferComponentType)
      )
    }
  }

  /**
  * @see System.managerDidAddComponent
  */
  public managerDidAddComponent (component : Component<any>) : void {
    if (component.type === BufferComponentType) {
      this.onBufferComponentAddition(component)
    }
  }

  /**
  * Called when a new shader component was discovered.
  *
  * @param component - The discovered component.
  */
  public onBufferComponentAddition (component : Component<Buffer>) : void {
    const shader : Shader = component.data

    shader.identifier = this.shaderCollection.create(shader.identifier, shader.type)
    this.shaderCollection.setSource(shader.identifier, shader.source)

    this._shadersComponents.set(shader.identifier, component.identifier)
    this._entityShaders.set(component.entity, shader.identifier)
  }

  /**
  * Called when a shader component was updated.
  *
  * @param component - The component to commit.
  */
  public commit (component : Component<Shader>) : void {
    const shader : Shader = component.data
    const oldIdentifier : number = this._entityShaders.get(component.entity)
    const oldType : ShaderType = this.shaderCollection.getType(oldIdentifier)
    const oldSource : ShaderSource = this.shaderCollection.getSource(oldIdentifier)

    if (oldIdentifier !== shader.identifier) {
      this.shaderCollection.delete(oldIdentifier)
      this.onShaderComponentAddition(component)
    } else if (oldType !== shader.type) {
      this.shaderCollection.delete(shader.identifier)
      this.shaderCollection.create(shader.identifier, shader.type)
      this.shaderCollection.setSource(shader.identifier, shader.source)
    } else if (oldSource.timestamp !== shader.source.timestamp) {
      this.shaderCollection.setSource(shader.identifier, shader.source)
    }
  }

  /**
  * @see System.managerWillDeleteComponent
  */
  public managerWillDeleteComponent (component : Component<any>) : void {
    if (component.type === ShaderComponentType) {
      this.onShaderComponentDeletion(component)
    }
  }

  /**
  * Called when a new shader component will be deleted.
  *
  * @param component - The component that will be deleted.
  */
  public onShaderComponentDeletion (component : Component<Shader>) : void {
    this.shaderCollection.delete(component.data.identifier)
  }

  /**
  * @see System.destroy
  */
  public destroy () : void {
    for (const entity of this.manager.getEntitiesWithType(ShaderComponentType)) {
      this.onShaderComponentDeletion(
        this.manager.getComponentOfEntity(entity, ShaderComponentType)
      )
    }
  }

  /**
  * Return the component related to the shader with the given identifier.
  *
  * @param identifier - Identifier of the shader to search.
  *
  * @return The component related to the shader with the given identifier.
  */
  public getComponent (identifier : ShaderIdentifier) : Component<Shader> {
    return this.manager.getComponent(this._shadersComponents.get(identifier))
  }
}
