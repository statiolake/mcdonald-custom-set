import { products } from './products';

export interface MenuItem {
  name: string;
  count: number;
  category: string;
}

export interface Product {
  name: string;
  items: MenuItem[];
  price: number;
}

interface State {
  [key: string]: number;  // アイテム名: 必要な個数
}

interface DPResult {
  cost: number;
  products: Product[];
  fulfilled: boolean;  // 必要数を満たしているかどうか
}

function getStateKey(state: State): string {
  return Object.entries(state)
    .filter(([_, count]) => count > 0)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([item, count]) => `${item}:${count}`)
    .join(',');
}

function copyState(state: State): State {
  return { ...state };
}

function isValidState(state: State): boolean {
  // 全てのアイテムが0以下（必要数を満たしている）かチェック
  return Object.values(state).every(count => count <= 0);
}

function applyProduct(state: State, product: Product): State | null {
  // 商品に含まれるアイテムのいずれかが必要な場合は適用可能
  let isNeeded = false;
  for (const item of product.items) {
    if (state[item.name] > 0) {
      isNeeded = true;
      break;
    }
  }

  if (!isNeeded) {
    return null;
  }

  const newState = copyState(state);

  // プロダクトを適用（必要数を超過してもOK）
  for (const item of product.items) {
    newState[item.name] = (newState[item.name] || 0) - item.count;
  }

  return newState;
}

function solve(state: State, memo: Map<string, DPResult>): DPResult {
  const stateKey = getStateKey(state);

  // 必要数を満たしている場合
  if (isValidState(state)) {
    return { cost: 0, products: [], fulfilled: true };
  }

  // メモ化されている場合はそれを返す
  if (memo.has(stateKey)) {
    return memo.get(stateKey)!;
  }

  let bestResult: DPResult = {
    cost: Infinity,
    products: [],
    fulfilled: false
  };

  // 全ての商品を試す
  for (const product of products) {
    const newState = applyProduct(state, product);
    if (newState !== null) {
      const result = solve(newState, memo);
      const totalCost = product.price + result.cost;

      // コストが同じ場合は、必要数を満たしている方を優先
      if (totalCost < bestResult.cost ||
          (totalCost === bestResult.cost && result.fulfilled && !bestResult.fulfilled)) {
        bestResult = {
          cost: totalCost,
          products: [product, ...result.products],
          fulfilled: isValidState(newState) || result.fulfilled
        };
      }
    }
  }

  // 結果をメモ化して返す
  memo.set(stateKey, bestResult);
  return bestResult;
}

export function calculateOptimalSet(selectedItems: string[]): Product[] {
  // 初期状態を作成
  const initialState: State = {};
  selectedItems.forEach(item => {
    initialState[item] = (initialState[item] || 0) + 1;
  });

  // メモ化用のマップ
  const memo = new Map<string, DPResult>();

  // 動的計画法で解を求める
  const result = solve(initialState, memo);

  return result.products;
}

export const MENU_FILE = './products';
