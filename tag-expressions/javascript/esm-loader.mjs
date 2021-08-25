import * as tsNodeEsm from 'ts-node/esm'

export const { resolve, getFormat } = tsNodeEsm

/**
 * Custom ESM Loader hook that transforms import statements like '@cucumber/something'
 * to '@cucumber/something/typescript' after passing it through the ts-node/esm loader.
 *
 * The purpose of this is to be able to load other typescript modules in the monorepo without
 * needing to transpile them first.
 *
 * The imported module must export a `./typescript` module in its package.json.
 */
export async function transformSource(source, context, defaultTransformSource) {
  const result = await tsNodeEsm.transformSource(source, context, defaultTransformSource);
  return {
    source: result.source.toString('utf-8').replace(/from '@cucumber\/([^']+)'/mg, "from '@cucumber/$1/typescript'")

  }
}
