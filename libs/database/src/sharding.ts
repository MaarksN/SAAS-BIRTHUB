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
    const keys = Array.from(this.shards.keys());
    if (keys.length === 0 || keys[0] === undefined) return undefined;
    return this.shards.get(keys[0]);
  }
}
