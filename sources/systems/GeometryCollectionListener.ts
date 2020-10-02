import { GeometryIdentifier } from '../GeometryIdentifier'
import { GeometryCollection } from './GeometryCollection'

export interface GeometryCollectionListener {
  /**
  * Called when this listener is attached to a collection.
  *
  * @param collection - The new parent collection of this listener.
  */
  afterSubscription (collection : GeometryCollection) : void

  /**
  * Called when the given geometry was created into the parent collection.
  *
  * @param identifier - Identifier of the geometry that was created.
  */
  afterGeometryCreation (identifier : GeometryIdentifier) : void

  /**
  * Called when an existing geometry data is commited.
  *
  * @param identifier - Identifier of the geometry that was commited.
  */
  afterGeometryCommit (identifier : GeometryIdentifier) : void

  /**
  * Called when the given geometry will be deleted from the parent collection.
  *
  * @param identifier - Identifier of the geometry that will be deleted.
  */
  beforeGeometryDeletion (identifier : GeometryIdentifier) : void

  /**
  * Called when this listener is detached from collection.
  *
  * @param system - The old collection of this listener.
  */
  beforeUnsubscription (collection : GeometryCollection) : void
}
