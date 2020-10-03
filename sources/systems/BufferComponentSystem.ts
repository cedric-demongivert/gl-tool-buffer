import { System } from '@cedric-demongivert/gl-tool-ecs'
import { Component } from '@cedric-demongivert/gl-tool-ecs'
import { Pack } from '@cedric-demongivert/gl-tool-collection'

import { BufferIdentifier } from '../BufferIdentifier'
import { BufferType } from '../BufferType'

import { Buffer } from '../components/Buffer'
import { BufferComponentType } from '../types/BufferComponentType'

import { BufferCollection } from './BufferCollection'

export class BufferComponentSystem extends System {
  /**
  * A collection of all existing buffers.
  */
  public readonly buffers : BufferCollection

  /**
  * A sequence of buffer identifier by entity.
  */
  private readonly _bufferByEntities : Pack<BufferIdentifier>

  /**
  * A sequence of component identifier by buffer.
  */
  private readonly _componentByBuffer : Pack<number>

  /**
  * Instantiate a new empty buffer component system.
  *
  * @param collection - The underlying buffer manager.
  */
  public constructor (collection : BufferCollection) {
    super()

    this.buffers = collection
    this._bufferByEntities = Pack.uint32(0)
    this._componentByBuffer = Pack.uint32(collection.capacity)
  }

  /**
  * @see System.initialize
  */
  public initialize () : void {
    this._bufferByEntities.reallocate(this.manager.capacity.entities)

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
  * Called when a new buffer component was discovered.
  *
  * @param component - The discovered component.
  */
  public onBufferComponentAddition (component : Component<Buffer>) : void {
    const buffer : Buffer = component.data

    buffer.identifier = this.buffers.create(buffer.identifier, buffer.type)
    this.buffers.commit(buffer.identifier, buffer.data)

    this._componentByBuffer.set(buffer.identifier, component.identifier)
    this._bufferByEntities.set(component.entity, buffer.identifier)
  }

  /**
  * Called when a buffer component was updated.
  *
  * @param component - The component to commit.
  */
  public commit (component : Component<Buffer>) : void {
    const buffer : Buffer = component.data
    const oldIdentifier : number = this._bufferByEntities.get(component.entity)
    const oldType : BufferType = this.buffers.getType(oldIdentifier)

    if (oldIdentifier !== buffer.identifier || oldType !== buffer.type) {
      this.buffers.delete(oldIdentifier)
      this.onBufferComponentAddition(component)
    } else {
      this.buffers.commit(buffer.identifier, buffer.data)
    }
  }

  /**
  * @see System.managerWillDeleteComponent
  */
  public managerWillDeleteComponent (component : Component<any>) : void {
    if (component.type === BufferComponentType) {
      this.onBufferComponentDeletion(component)
    }
  }

  /**
  * Called when a buffer component will be deleted.
  *
  * @param component - The component that will be deleted.
  */
  public onBufferComponentDeletion (component : Component<Buffer>) : void {
    this.buffers.delete(component.data.identifier)
  }

  /**
  * @see System.destroy
  */
  public destroy () : void {
    for (const entity of this.manager.getEntitiesWithType(BufferComponentType)) {
      this.onBufferComponentDeletion(
        this.manager.getComponentOfEntity(entity, BufferComponentType)
      )
    }
  }

  /**
  * Return the component related to the buffer with the given identifier.
  *
  * @param identifier - Identifier of the buffer to search.
  *
  * @return The component related to the buffer with the given identifier.
  */
  public getComponent (identifier : BufferIdentifier) : Component<Buffer> {
    return this.manager.getComponent(this._componentByBuffer.get(identifier))
  }
}
