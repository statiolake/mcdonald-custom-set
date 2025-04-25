import { products } from './products';

export interface Product {
	name: string;
	items: Item[];
	price: number;
}

export type Item = SimpleItem | ChoiceItem;

export interface SimpleItem {
	name: string;
	count: number;
}

export interface ChoiceItem {
	choices: Choice[];
}

export interface ProductInstance {
	name: string;
	items: ItemInstance[];
	price: number;
}

// インスタンス化された商品の型
export interface ItemInstance {
	name: string;
	count: number;
}

interface Choice {
	name: string;
	count: number;
	priceAdjustment: number;
}

// インスタンス化された商品のリストへの変換関数
export function expandProducts(products: Product[]): ProductInstance[] {
	return products.flatMap(expandProduct);
}

function expandProduct(product: Product): ProductInstance[] {
	// ChoiceItemとSimpleItemに分類
	const choices: ChoiceItem[] = [];
	const simpleItems: ItemInstance[] = [];

	for (const item of product.items) {
		if ('choices' in item) {
			choices.push(item);
		} else {
			simpleItems.push({
				name: item.name,
				count: item.count
			});
		}
	}

	if (choices.length === 0) {
		// 選択肢を持つアイテムがない場合は、そのままProductInstanceに変換
		return [{
			name: product.name,
			items: simpleItems,
			price: product.price
		}];
	}

	// 各選択肢の組み合わせを生成
	const combinations = generateCombinations(choices);

	// 各組み合わせに対してProductInstanceを生成
	return combinations.map(selectedChoices => {
		const choiceItems: ItemInstance[] = selectedChoices
			.filter(choice => choice.count > 0)
			.map(choice => ({
				name: choice.name,
				count: choice.count
			}));

		const totalPriceAdjustment = selectedChoices.reduce(
			(sum, choice) => sum + choice.priceAdjustment,
			0
		);

		return {
			name: product.name + (choiceItems.length > 0
				? `（${choiceItems.map(item => item.name).join('、')}）`
				: ''),
			items: [...simpleItems, ...choiceItems],
			price: product.price + totalPriceAdjustment
		};
	});
}

// 選択肢の全組み合わせを生成する関数
function generateCombinations(items: ChoiceItem[]): Choice[][] {
	// 空の配列の場合は空の組み合わせを返す
	if (items.length === 0) return [[]];

	// 各アイテムの選択肢を配列に変換
	const choiceArrays = items.map(item => item.choices);

	// 最初の選択肢から開始
	let combinations = choiceArrays[0].map(choice => [choice]);

	// 残りの選択肢を組み合わせる
	for (let i = 1; i < choiceArrays.length; i++) {
		const newCombinations: Choice[][] = [];
		const choices = choiceArrays[i];

		// 既存の組み合わせに新しい選択肢を追加
		for (const combo of combinations) {
			for (const choice of choices) {
				newCombinations.push([...combo, choice]);
			}
		}

		combinations = newCombinations;
	}

	return combinations;
}

interface State {
	[key: string]: number; // アイテム名: 必要な個数
}

interface DPResult {
	cost: number;
	products: ProductInstance[];
	fulfilled: boolean; // 必要数を満たしているかどうか
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
	return Object.values(state).every((count) => count <= 0);
}

function applyProduct(state: State, product: ProductInstance): State | null {
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
	const instances = expandProducts(products);
	for (const product of instances) {
		const newState = applyProduct(state, product);
		if (newState !== null) {
			const result = solve(newState, memo);
			const totalCost = product.price + result.cost;

			// コストが同じ場合は、必要数を満たしている方を優先
			if (
				totalCost < bestResult.cost ||
				(totalCost === bestResult.cost && result.fulfilled && !bestResult.fulfilled)
			) {
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

export function calculateOptimalSet(selectedItems: string[]): ProductInstance[] {
	// 初期状態を作成
	const initialState: State = {};
	selectedItems.forEach((item) => {
		initialState[item] = (initialState[item] || 0) + 1;
	});

	// メモ化用のマップ
	const memo = new Map<string, DPResult>();

	// 動的計画法で解を求める
	const result = solve(initialState, memo);

	return result.products;
}

export const MENU_FILE = './products';
