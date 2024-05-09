import Trie "mo:base/Trie";
import Text "mo:base/Text";
import Nat32 "mo:base/Nat32";

actor GarbageCollector {

  // User details
  public type UserDetails = {
    id : Nat32;
    name : Text;
    email : Text;
    phoneNumber : Nat32;
  };

  // Custom type representing a date and time
  type DateTime = {
    day : Nat32;
    month : Nat32;
    year : Nat32;
  };

  // Trie key for user details
  private func userKey(id : Nat32) : Trie.Key<Nat32> {
    return { hash = id; key = id };
  };

  // Storage for user details
  private stable var users : Trie.Trie<Nat32, UserDetails> = Trie.empty();

  // Trie to store scheduled garbage collection dates
  private stable var collectionDates : Trie.Trie<Nat32, DateTime> = Trie.empty();

  // Function to create or update user details
  public func createUserDetails(id : Nat32, name : Text, email : Text, phoneNumber : Nat32) : async Nat32 {
    let user = {
      id = id;
      name = name;
      email = email;
      phoneNumber = phoneNumber;
    };

    users := Trie.replace(
      users,
      userKey(id),
      Nat32.equal,
      ?user,
    ).0;

    return id;
  };

  // Function to fetch user details
  public query func getUserDetails(id : Nat32) : async ?UserDetails {
    return Trie.find(users, userKey(id), Nat32.equal);
  };

  // Function to schedule garbage collection date
  public func scheduleGarbageCollection(_userId : Nat32, _collectionDate : DateTime) : async Bool {
    collectionDates := Trie.replace(
      collectionDates,
      userKey(_userId),
      Nat32.equal,
      ?_collectionDate,
    ).0;

    return true;
  };

  // Function to reschedule garbage collection date
  public func rescheduleGarbageCollection(_userId : Nat32, _newCollectionDate : DateTime) : async Bool {
    collectionDates := Trie.replace(
      collectionDates,
      userKey(_userId),
      Nat32.equal,
      ?_newCollectionDate,
    ).0;

    return true;
  };

  // Query function to fetch scheduled garbage collection date
  public query func getGarbageCollectionDate(id: Nat32) : async ?DateTime {
    return Trie.find(collectionDates, userKey(id), Nat32.equal);
  };
};
