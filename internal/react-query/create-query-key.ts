export function createQueryKey<TArgs>(
  key: string,
  args: TArgs,
  config: {
    persisterVersion?: number;
  } = {}
) {
  return [args, key, config] as const;
}
