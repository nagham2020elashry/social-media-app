export interface UserType {
  _id: string;
  id: string;
  name: string;
  username: string;
  email: string;
  gender: "male" | "female";
  dateOfBirth: string; // ISO date string
  createdAt: string;   // ISO date string
  photo: string;
  cover: string;

  bookmarks: string[];   // IDs of bookmarked posts
  bookmarksCount: number;

  followers: string[];   // IDs of follower users
  followersCount: number;

  following: string[];   // IDs of followed users
  followingCount: number;
}