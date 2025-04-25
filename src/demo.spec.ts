import { expect, test } from 'vitest';
import { expandProducts } from './lib/menu';
import { products } from './lib/products';

test('商品の選択肢展開', () => {
  const expanded = expandProducts(products);

  // ドリンクのサイズ選択とナゲットの有無で6通りのパターンができるはず
  // ドリンク: S/M/L の3通り
  // ナゲット: なし/5ピース の2通り
  const bigMacSets = expanded.filter(p => p.name.startsWith('ビッグマック セット'));
  expect(bigMacSets).toHaveLength(6);

  // 価格のテスト
  const bigMacSetS = bigMacSets.find(p => p.name.includes('S') && p.name.includes('なし'));
  expect(bigMacSetS?.price).toBe(750);  // 基本価格

  const bigMacSetM = bigMacSets.find(p => p.name.includes('M') && p.name.includes('なし'));
  expect(bigMacSetM?.price).toBe(880);  // 基本価格 + 130円

  const bigMacSetL = bigMacSets.find(p => p.name.includes('L') && p.name.includes('なし'));
  expect(bigMacSetL?.price).toBe(930);  // 基本価格 + 180円

  const bigMacSetSWithNugget = bigMacSets.find(p => p.name.includes('S') && p.name.includes('5ピース'));
  expect(bigMacSetSWithNugget?.price).toBe(950);  // 基本価格 + 200円

  const bigMacSetMWithNugget = bigMacSets.find(p => p.name.includes('M') && p.name.includes('5ピース'));
  expect(bigMacSetMWithNugget?.price).toBe(1080);  // 基本価格 + 130円 + 200円

  const bigMacSetLWithNugget = bigMacSets.find(p => p.name.includes('L') && p.name.includes('5ピース'));
  expect(bigMacSetLWithNugget?.price).toBe(1130);  // 基本価格 + 180円 + 200円

  // 展開された商品のアイテム数をテスト
  const bigMacSetSNoNugget = bigMacSets.find(p => p.name.includes('S') && p.name.includes('なし'));
  expect(bigMacSetSNoNugget?.items).toHaveLength(3);  // ビッグマック、ポテト、ドリンク（ナゲットなしは含まれない）

  const bigMacSetSWithNuggetItems = bigMacSets.find(p => p.name.includes('S') && p.name.includes('5ピース'));
  expect(bigMacSetSWithNuggetItems?.items).toHaveLength(4);  // ビッグマック、ポテト、ドリンク、ナゲット
});
