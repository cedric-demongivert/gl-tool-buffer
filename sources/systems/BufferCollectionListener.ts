import { BufferIdentifier } from '../BufferIdentifier'
import { BufferCollection } from './BufferCollection'

export interface BufferCollectionListener {
  /**
  * Called when this listener is attached to a collection.
  *
  * @param collection - The new parent collection of this listener.
  */
  afterSubscription (collection : BufferCollection) : void

  /**
  * Called when the given buffer was created into the parent collection.
  *
  * @param identifier - Identifier of the buffer that was created.
  */
  afterBufferCreation (identifier : BufferIdentifier) : void

  /**
  * Called when an existing buffer data is commited.
  *
  * @param identifier - Identifier of the buffer that was commited.
  */
  afterBufferCommit (identifier : BufferIdentifier) : void

  /**
  * Called when the given buffer will be deleted from the parent collection.
  *
  * @param identifier - Identifier of the buffer that will be deleted.
  */
  beforeBufferDeletion (identifier : BufferIdentifier) : void

  /**
  * Called when this listener is detached from collection.
  *
  * @param system - The old collection of this listener.
  */
  beforeUnsubscription (collection : BufferCollection) : void
}
