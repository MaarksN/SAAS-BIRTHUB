export interface ShardConfig {
  shardId: string;
  databaseUrl: string;
  region: string;
}

export class ShardingManager {
  private shards: Map<string, ShardConfig> = new Map();

  registerShard(config: ShardConfig) {
    this.shards.set(config.shardId, config);
  }

  getShardForUser(userId: string): ShardConfig | undefined {
    // Simple consistent hashing or lookup table strategy
    // For demo purposes, we return the first shard
    const keys = Array.from(this.shards.keys());
    if (keys.length === 0) return undefined;

    // Explicitly check for undefined to satisfy strict mode
    const firstKey = keys[0];
    if (firstKey === undefined) return undefined;

    return this.shards.get(firstKey);
  }
}
