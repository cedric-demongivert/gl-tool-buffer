import { System } from '@cedric-demongivert/gl-tool-ecs'
import { Component } from '@cedric-demongivert/gl-tool-ecs'
import { Pack } from '@cedric-demongivert/gl-tool-collection'

import { GeometryIdentifier } from '../GeometryIdentifier'

import { Geometry } from '../components/Geometry'
import { GeometryComponentType } from '../types/GeometryComponentType'

import { GeometryCollection } from './GeometryCollection'

export class GeometryComponentSystem extends System {
  /**
  * A collection of all existing geometries.
  */
  public readonly geometries : GeometryCollection

  /**
  * A sequence of geometry identifier by entity.
  */
  private readonly _geometryByEntities : Pack<GeometryIdentifier>

  /**
  * A sequence of component identifier by geometry.
  */
  private readonly _componentByGeometry : Pack<number>

  /**
  * Instantiate a new empty geometry component system.
  *
  * @param collection - The underlying geometry manager.
  */
  public constructor (collection : GeometryCollection) {
    super()

    this.geometries = collection
    this._geometryByEntities = Pack.uint32(0)
    this._componentByGeometry = Pack.uint32(collection.capacity)
  }

  /**
  * @see System.initialize
  */
  public initialize () : void {
    this._geometryByEntities.reallocate(this.manager.capacity.entities)

    for (const entity of this.manager.getEntitiesWithType(GeometryComponentType)) {
      this.onGeometryComponentAddition(
        this.manager.getComponentOfEntity(entity, GeometryComponentType)
      )
    }
  }

  /**
  * @see System.managerDidAddComponent
  */
  public managerDidAddComponent (component : Component<any>) : void {
    if (component.type === GeometryComponentType) {
      this.onGeometryComponentAddition(component)
    }
  }

  /**
  * Called when a new geometry component was discovered.
  *
  * @param component - The discovered component.
  */
  public onGeometryComponentAddition (component : Component<Geometry>) : void {
    const geometry : Geometry = component.data

    geometry.identifier = this.geometries.create(geometry.identifier)
    this.geometries.setFaces(geometry.identifier, geometry.faces)
    this.geometries.setVertices(geometry.identifier, geometry.vertices)
    this.geometries.commit(geometry.identifier)

    this._componentByGeometry.set(geometry.identifier, component.identifier)
    this._geometryByEntities.set(component.entity, geometry.identifier)
  }

  /**
  * Called when a geometry component was updated.
  *
  * @param component - The component to commit.
  */
  public commit (component : Component<Geometry>) : void {
    const geometry : Geometry = component.data
    const oldIdentifier : number = this._geometryByEntities.get(component.entity)

    if (oldIdentifier !== geometry.identifier) {
      this.geometries.delete(oldIdentifier)
      this.onGeometryComponentAddition(component)
    } else {
      this.geometries.setFaces(geometry.identifier, geometry.faces)
      this.geometries.setVertices(geometry.identifier, geometry.vertices)
      this.geometries.commit(geometry.identifier)
    }
  }

  /**
  * @see System.managerWillDeleteComponent
  */
  public managerWillDeleteComponent (component : Component<any>) : void {
    if (component.type === GeometryComponentType) {
      this.onGeometryComponentDeletion(component)
    }
  }

  /**
  * Called when a geometry component will be deleted.
  *
  * @param component - The component that will be deleted.
  */
  public onGeometryComponentDeletion (component : Component<Geometry>) : void {
    this.geometries.delete(component.data.identifier)
  }

  /**
  * @see System.destroy
  */
  public destroy () : void {
    for (const entity of this.manager.getEntitiesWithType(GeometryComponentType)) {
      this.onGeometryComponentDeletion(
        this.manager.getComponentOfEntity(entity, GeometryComponentType)
      )
    }
  }

  /**
  * Return the component related to the geometry with the given identifier.
  *
  * @param identifier - Identifier of the geometry to search.
  *
  * @return The component related to the geometry with the given identifier.
  */
  public getComponent (identifier : GeometryIdentifier) : Component<Geometry> {
    return this.manager.getComponent(this._componentByGeometry.get(identifier))
  }
}
