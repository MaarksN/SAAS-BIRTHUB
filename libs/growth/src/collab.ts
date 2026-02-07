export interface UserPresence {
  userId: string;
  status: 'online' | 'idle' | 'offline';
  lastSeen: Date;
  currentPath: string;
}

export class CollaborationService {
  private activeUsers: Map<string, UserPresence> = new Map();

  updatePresence(userId: string, path: string): void {
    this.activeUsers.set(userId, {
      userId,
      status: 'online',
      lastSeen: new Date(),
      currentPath: path
    });
    console.log(`User ${userId} is now on ${path}`);
  }

  getActiveUsersOnPath(path: string): UserPresence[] {
    return Array.from(this.activeUsers.values()).filter(u => u.currentPath === path);
  }
}
