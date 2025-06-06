import type { ChoiceItem, Product } from './menu';

// セット商品のドリンク
const setDrink: ChoiceItem = {
	choices: [
		{ name: 'ドリンクM', count: 1, priceAdjustment: 0 },
		{ name: 'ドリンクL', count: 1, priceAdjustment: 50 }
	]
};

// 朝マック用ドリンク
const breakfastDrink: ChoiceItem = {
	choices: [
		{ name: 'ドリンク(朝)M', count: 1, priceAdjustment: 0 },
		{ name: 'ドリンク(朝)L', count: 1, priceAdjustment: 50 }
	]
};

// ポテト
const setSideMenu: ChoiceItem = {
	choices: [
		{ name: 'マックフライポテトS', count: 1, priceAdjustment: -50 },
		{ name: 'マックフライポテトM', count: 1, priceAdjustment: 0 },
		{ name: 'チキンマックナゲット', count: 5, priceAdjustment: 0 },
		{ name: 'マックフライポテトL', count: 1, priceAdjustment: 50 }
	]
};

// 朝マック用ハッシュポテト
const breakfastPotato: ChoiceItem = {
	choices: [{ name: 'ハッシュポテト', count: 1, priceAdjustment: 0 }]
};

export const products: Product[] = [
	// 夜マック
	{
		name: 'ごはんチキンタツタ タルタル南蛮 セット',
		items: [{ name: 'ごはんチキンタツタ タルタル南蛮', count: 1 }, setSideMenu, setDrink],
		price: 850
	},
	{
		name: 'ごはんチキンタツタ セット',
		items: [{ name: 'ごはんチキンタツタ', count: 1 }, setSideMenu, setDrink],
		price: 800
	},
	{
		name: '倍ビッグマック セット',
		items: [{ name: '倍ビッグマック', count: 1 }, setSideMenu, setDrink],
		price: 990
	},
	{
		name: '倍ダブルチーズバーガー セット',
		items: [{ name: '倍ダブルチーズバーガー', count: 1 }, setSideMenu, setDrink],
		price: 940
	},
	{
		name: '倍てりやきマックバーガー セット',
		items: [{ name: '倍てりやきマックバーガー', count: 1 }, setSideMenu, setDrink],
		price: 790
	},
	{
		name: '倍フィレオフィッシュセット',
		items: [{ name: '倍フィレオフィッシュ', count: 1 }, setSideMenu, setDrink],
		price: 800
	},
	{
		name: '倍チキンフィレオセット',
		items: [{ name: '倍チキンフィレオ', count: 1 }, setSideMenu, setDrink],
		price: 800
	},
	{
		name: '倍てりやきチキンフィレオセット',
		items: [{ name: '倍てりやきチキンフィレオ', count: 1 }, setSideMenu, setDrink],
		price: 810
	},
	{
		name: '倍ベーコンレタスバーガー セット',
		items: [{ name: '倍ベーコンレタスバーガー', count: 1 }, setSideMenu, setDrink],
		price: 810
	},
	{
		name: '倍えびフィレオセット',
		items: [{ name: '倍えびフィレオ', count: 1 }, setSideMenu, setDrink],
		price: 820
	},
	{
		name: '倍マックチキン セット',
		items: [{ name: '倍マックチキン', count: 1 }, setSideMenu, setDrink],
		price: 620
	},
	{
		name: '倍スパチキ(辛スパイシーマックチキン) セット',
		items: [{ name: '倍スパチキ(辛スパイシーマックチキン)', count: 1 }, setSideMenu, setDrink],
		price: 660
	},
	{
		name: '倍チキチー(倍マックチキンチーズ) セット',
		items: [{ name: '倍チキチー(倍マックチキンチーズ)', count: 1 }, setSideMenu, setDrink],
		price: 680
	},
	{
		name: '倍エグチ(倍エッグチーズバーガー) セット',
		items: [{ name: '倍エグチ(倍エッグチーズバーガー)', count: 1 }, setSideMenu, setDrink],
		price: 680
	},
	{
		name: '倍ハンバーガー セット',
		items: [{ name: '倍ハンバーガー', count: 1 }, setSideMenu, setDrink],
		price: 620
	},

	// レギュラーセット
	{
		name: 'タルタル南蛮チキンタツタ 倍マックセット',
		items: [{ name: 'タルタル南蛮チキンタツタ 倍マック', count: 1 }, setSideMenu, setDrink],
		price: 890
	},
	{
		name: 'チキンタツタ 倍マックセット',
		items: [{ name: 'チキンタツタ 倍マック', count: 1 }, setSideMenu, setDrink],
		price: 840
	},
	{
		name: 'タルタル南蛮チキンタツタ セット',
		items: [{ name: 'タルタル南蛮チキンタツタ', count: 1 }, setSideMenu, setDrink],
		price: 800
	},
	{
		name: 'チキンタツタ セット',
		items: [{ name: 'チキンタツタ', count: 1 }, setSideMenu, setDrink],
		price: 750
	},
	{
		name: 'ビッグマック セット',
		items: [{ name: 'ビッグマック', count: 1 }, setSideMenu, setDrink],
		price: 750
	},
	{
		name: '炙り醤油風 ダブル肉厚ビーフセット',
		items: [{ name: '炙り醤油風 ダブル肉厚ビーフ', count: 1 }, setSideMenu, setDrink],
		price: 850
	},
	{
		name: '炙り醤油風 たまごベーコン肉厚ビーフセット',
		items: [{ name: '炙り醤油風 たまごベーコン肉厚ビーフ', count: 1 }, setSideMenu, setDrink],
		price: 840
	},
	{
		name: 'ダブルチーズバーガー セット',
		items: [{ name: 'ダブルチーズバーガー', count: 1 }, setSideMenu, setDrink],
		price: 700
	},
	{
		name: 'てりやきマックバーガー セット',
		items: [{ name: 'てりやきマックバーガー', count: 1 }, setSideMenu, setDrink],
		price: 670
	},
	{
		name: 'フィレオフィッシュ セット',
		items: [{ name: 'フィレオフィッシュ', count: 1 }, setSideMenu, setDrink],
		price: 680
	},
	{
		name: 'チキンフィレオ セット',
		items: [{ name: 'チキンフィレオ', count: 1 }, setSideMenu, setDrink],
		price: 680
	},
	{
		name: 'てりやきチキンフィレオ セット',
		items: [{ name: 'てりやきチキンフィレオ', count: 1 }, setSideMenu, setDrink],
		price: 690
	},
	{
		name: 'ベーコンレタスバーガー セット',
		items: [{ name: 'ベーコンレタスバーガー', count: 1 }, setSideMenu, setDrink],
		price: 690
	},
	{
		name: 'えびフィレオ セット',
		items: [{ name: 'えびフィレオ', count: 1 }, setSideMenu, setDrink],
		price: 700
	},
	{
		name: 'マックチキン セット',
		items: [{ name: 'マックチキン', count: 1 }, setSideMenu, setDrink],
		price: 500
	},
	{
		name: 'スパチキ(スパイシーマックチキン) セット',
		items: [{ name: 'スパチキ(スパイシーマックチキン)', count: 1 }, setSideMenu, setDrink],
		price: 540
	},
	{
		name: 'チキチー(マックチキン チーズ) セット',
		items: [{ name: 'チキチー(マックチキン チーズ)', count: 1 }, setSideMenu, setDrink],
		price: 560
	},
	{
		name: 'エグチ(エッグチーズバーガー) セット',
		items: [{ name: 'エグチ(エッグチーズバーガー)', count: 1 }, setSideMenu, setDrink],
		price: 560
	},
	{
		name: 'ハンバーガー セット',
		items: [{ name: 'ハンバーガー', count: 1 }, setSideMenu, setDrink],
		price: 500
	},

	// 朝マックセット
	{
		name: 'タルタル南蛮チキンタツタ 朝マックセット',
		items: [
			{ name: 'タルタル南蛮チキンタツタ 朝マック', count: 1 },
			breakfastPotato,
			breakfastDrink
		],
		price: 700
	},
	{
		name: 'チキンタツタ 朝マックセット',
		items: [{ name: 'チキンタツタ 朝マック', count: 1 }, breakfastPotato, breakfastDrink],
		price: 650
	},
	{
		name: 'エッグマックマフィン セット',
		items: [{ name: 'エッグマックマフィン', count: 1 }, breakfastPotato, breakfastDrink],
		price: 460
	},
	{
		name: 'ベーコンエッグマックサンド セット',
		items: [{ name: 'ベーコンエッグマックサンド', count: 1 }, breakfastPotato, breakfastDrink],
		price: 490
	},
	{
		name: 'ソーセージエッグマフィン セット',
		items: [{ name: 'ソーセージエッグマフィン', count: 1 }, breakfastPotato, breakfastDrink],
		price: 530
	},
	{
		name: 'ソーセージマフィン セット',
		items: [{ name: 'ソーセージマフィン', count: 1 }, breakfastPotato, breakfastDrink],
		price: 400
	},
	{
		name: 'チキンマックマフィン セット',
		items: [{ name: 'チキンマックマフィン', count: 1 }, breakfastPotato, breakfastDrink],
		price: 420
	},
	{
		name: 'フィレオフィッシュ セット',
		items: [{ name: 'フィレオフィッシュ', count: 1 }, breakfastPotato, breakfastDrink],
		price: 600
	},
	{
		name: 'ホットケーキ セット',
		items: [{ name: 'ホットケーキ', count: 1 }, breakfastPotato, breakfastDrink],
		price: 560
	},
	{
		name: 'マックグリドル ソーセージエッグ セット',
		items: [{ name: 'マックグリドル ソーセージエッグ', count: 1 }, breakfastPotato, breakfastDrink],
		price: 560
	},
	{
		name: 'マックグリドル ベーコンエッグ セット',
		items: [{ name: 'マックグリドル ベーコンエッグ', count: 1 }, breakfastPotato, breakfastDrink],
		price: 540
	},
	{
		name: 'マックグリドル ソーセージ セット',
		items: [{ name: 'マックグリドル ソーセージ', count: 1 }, breakfastPotato, breakfastDrink],
		price: 450
	},
	{
		name: 'メガマフィン セット',
		items: [{ name: 'メガマフィン', count: 1 }, breakfastPotato, breakfastDrink],
		price: 620
	},
	{
		name: 'タルタル南蛮チキンタツタ 朝マックコンビ',
		items: [{ name: 'タルタル南蛮チキンタツタ 朝マック', count: 1 }, breakfastDrink],
		price: 560
	},
	{
		name: 'チキンタツタ 朝マックコンビ',
		items: [{ name: 'チキンタツタ 朝マック', count: 1 }, breakfastDrink],
		price: 510
	},
	{
		name: 'エッグマックマフィン コンビ',
		items: [{ name: 'エッグマックマフィン', count: 1 }, breakfastDrink],
		price: 350
	},
	{
		name: 'ベーコンエッグマックサンド コンビ',
		items: [{ name: 'ベーコンエッグマックサンド', count: 1 }, breakfastDrink],
		price: 360
	},
	{
		name: 'ソーセージエッグマフィン コンビ',
		items: [{ name: 'ソーセージエッグマフィン', count: 1 }, breakfastDrink],
		price: 380
	},
	{
		name: 'ソーセージマフィン コンビ',
		items: [{ name: 'ソーセージマフィン', count: 1 }, breakfastDrink],
		price: 240
	},
	{
		name: 'チキンマックマフィン コンビ',
		items: [{ name: 'チキンマックマフィン', count: 1 }, breakfastDrink],
		price: 270
	},

	// ひるまック
	{
		name: 'ひるまック ビッグマック セット',
		items: [{ name: 'ビッグマック', count: 1 }, setSideMenu, setDrink],
		price: 680
	},
	{
		name: 'ひるまック てりやきチキンフィレオ セット',
		items: [{ name: 'てりやきチキンフィレオ', count: 1 }, setSideMenu, setDrink],
		price: 630
	},
	{
		name: 'ひるまック ダブルチーズバーガー セット',
		items: [{ name: 'ダブルチーズバーガー', count: 1 }, setSideMenu, setDrink],
		price: 640
	},
	{
		name: 'ひるまック てりやきマックバーガー セット',
		items: [{ name: 'てりやきマックバーガー', count: 1 }, setSideMenu, setDrink],
		price: 600
	},
	{
		name: 'ひるまック フィレオフィッシュ セット',
		items: [{ name: 'フィレオフィッシュ', count: 1 }, setSideMenu, setDrink],
		price: 620
	},

	// 夜マック 単品
	{
		name: 'ポテナゲ大',
		items: [
			{ name: 'マックフライポテトL', count: 1 },
			{ name: 'チキンマックナゲット', count: 10 }
		],
		price: 600
	},
	{
		name: 'ポテナゲ特大',
		items: [
			{ name: 'マックフライポテトL', count: 2 },
			{ name: 'チキンマックナゲット', count: 15 }
		],
		price: 960
	},

	// レギュラー メニュー
	{
		name: 'チキンマックナゲット 15ピース',
		items: [{ name: 'チキンマックナゲット', count: 15 }],
		price: 490
	},
	{
		name: 'チキンマックナゲット 5ピース',
		items: [{ name: 'チキンマックナゲット', count: 5 }],
		price: 290
	},
	{
		name: 'シャカシャカポテト じゃがバター',
		items: [
			{ name: 'シャカシャカポテト', count: 1 },
			{ name: 'じゃがバターシーズニング', count: 1 }
		],
		price: 240
	},
	{
		name: 'シャカシャカポテト じゃがバターシーズニング',
		items: [{ name: 'シャカシャカポテトシーズニング', count: 1 }],
		price: 40
	},
	{
		name: 'ベーコンポテトパイ',
		items: [{ name: 'ベーコンポテトパイ', count: 1 }],
		price: 180
	},
	{
		name: 'マックフライポテト',
		items: [
			{
				choices: [
					{ name: 'マックフライポテトS', count: 1, priceAdjustment: 0 },
					{ name: 'マックフライポテトM', count: 1, priceAdjustment: 130 },
					{ name: 'マックフライポテトL', count: 1, priceAdjustment: 180 }
				]
			}
		],
		price: 200
	},
	{
		name: 'サイドサラダ',
		items: [{ name: 'サイドサラダ', count: 1 }],
		price: 350
	},
	{
		name: 'えだまめコーン',
		items: [{ name: 'えだまめコーン', count: 1 }],
		price: 300
	},
	{
		name: 'シャカチキ',
		items: [{ name: 'シャカチキ', count: 1 }],
		price: 220
	},
	{
		name: 'シャカチキ レッドペッパー',
		items: [
			{ name: 'シャカチキ', count: 1 },
			{ name: 'レッドペッパーソース', count: 1 }
		],
		price: 220
	},
	{
		name: 'シャカチキ チェダーチーズ',
		items: [
			{ name: 'シャカチキ', count: 1 },
			{ name: 'チェダーチーズソース', count: 1 }
		],
		price: 220
	},
	{
		name: 'ごはんチキンタツタ タルタル南蛮',
		items: [{ name: 'ごはんチキンタツタ タルタル南蛮', count: 1 }],
		price: 550
	},
	{
		name: 'ごはんチキンタツタ',
		items: [{ name: 'ごはんチキンタツタ', count: 1 }],
		price: 500
	},
	{
		name: '倍ビッグマック',
		items: [{ name: '倍ビッグマック', count: 1 }],
		price: 720
	},
	{
		name: '倍ダブルチーズバーガー',
		items: [{ name: '倍ダブルチーズバーガー', count: 1 }],
		price: 690
	},
	{
		name: '倍てりやきマックバーガー',
		items: [{ name: '倍てりやきマックバーガー', count: 1 }],
		price: 520
	},
	{
		name: '倍フィレオフィッシュ',
		items: [{ name: '倍フィレオフィッシュ', count: 1 }],
		price: 520
	},
	{
		name: '倍チキンフィレオ',
		items: [{ name: '倍チキンフィレオ', count: 1 }],
		price: 540
	},
	{
		name: '倍てりやきチキンフィレオ',
		items: [{ name: '倍てりやきチキンフィレオ', count: 1 }],
		price: 540
	},
	{
		name: '倍ベーコンレタスバーガー',
		items: [{ name: '倍ベーコンレタスバーガー', count: 1 }],
		price: 540
	},
	{
		name: '倍えびフィレオ',
		items: [{ name: '倍えびフィレオ', count: 1 }],
		price: 550
	},
	{
		name: '倍マックチキン',
		items: [{ name: '倍マックチキン', count: 1 }],
		price: 310
	},
	{
		name: '倍スパチキ(倍スパイシーマックチキン)',
		items: [{ name: '倍スパチキ(倍スパイシーマックチキン)', count: 1 }],
		price: 340
	},
	{
		name: '倍チキチー(倍マックチキンチーズ)',
		items: [{ name: '倍チキチー(倍マックチキンチーズ)', count: 1 }],
		price: 370
	},
	{
		name: '倍エグチ(倍エッグチーズバーガー)',
		items: [{ name: '倍エグチ(倍エッグチーズバーガー)', count: 1 }],
		price: 370
	},
	{
		name: '倍ハンバーガー',
		items: [{ name: '倍ハンバーガー', count: 1 }],
		price: 310
	},
	{
		name: '倍チーズバーガー',
		items: [{ name: '倍チーズバーガー', count: 1 }],
		price: 340
	},

	// レギュラー 単品バーガー
	{
		name: 'タルタル南蛮チキンタツタ',
		items: [{ name: 'タルタル南蛮チキンタツタ', count: 1 }],
		price: 500
	},
	{
		name: 'チキンタツタ',
		items: [{ name: 'チキンタツタ', count: 1 }],
		price: 450
	},
	{
		name: 'ビッグマック',
		items: [{ name: 'ビッグマック', count: 1 }],
		price: 480
	},
	{
		name: '炙り醤油風 ダブル肉厚ビーフ',
		items: [{ name: '炙り醤油風 ダブル肉厚ビーフ', count: 1 }],
		price: 580
	},
	{
		name: '炙り醤油風 たまごベーコン肉厚ビーフ',
		items: [{ name: '炙り醤油風 たまごベーコン肉厚ビーフ', count: 1 }],
		price: 570
	},
	{
		name: 'ダブルチーズバーガー',
		items: [{ name: 'ダブルチーズバーガー', count: 1 }],
		price: 450
	},
	{
		name: 'てりやきマックバーガー',
		items: [{ name: 'てりやきマックバーガー', count: 1 }],
		price: 400
	},
	{
		name: 'フィレオフィッシュ',
		items: [{ name: 'フィレオフィッシュ', count: 1 }],
		price: 400
	},
	{
		name: 'チキンフィレオ',
		items: [{ name: 'チキンフィレオ', count: 1 }],
		price: 420
	},
	{
		name: 'てりやきチキンフィレオ',
		items: [{ name: 'てりやきチキンフィレオ', count: 1 }],
		price: 420
	},
	{
		name: 'ベーコンレタスバーガー',
		items: [{ name: 'ベーコンレタスバーガー', count: 1 }],
		price: 420
	},
	{
		name: 'えびフィレオ',
		items: [{ name: 'えびフィレオ', count: 1 }],
		price: 430
	},
	{
		name: 'マックチキン',
		items: [{ name: 'マックチキン', count: 1 }],
		price: 190
	},
	{
		name: 'スパチキ(スパイシーマックチキン)',
		items: [{ name: 'スパチキ(スパイシーマックチキン)', count: 1 }],
		price: 220
	},
	{
		name: 'チキチー(マックチキンチーズ)',
		items: [{ name: 'チキチー(マックチキンチーズ)', count: 1 }],
		price: 250
	},
	{
		name: 'エグチ(エッグチーズバーガー)',
		items: [{ name: 'エグチ(エッグチーズバーガー)', count: 1 }],
		price: 250
	},
	{
		name: 'ハンバーガー',
		items: [{ name: 'ハンバーガー', count: 1 }],
		price: 190
	},
	{
		name: 'チーズバーガー',
		items: [{ name: 'チーズバーガー', count: 1 }],
		price: 220
	},

	// 朝マック 単品サンドイッチ
	{
		name: 'タルタル南蛮チキンタツタ(朝)',
		items: [{ name: 'タルタル南蛮チキンタツタ(朝)', count: 1 }],
		price: 500
	},
	{
		name: 'チキンタツタ(朝)',
		items: [{ name: 'チキンタツタ(朝)', count: 1 }],
		price: 450
	},
	{
		name: 'エッグマックマフィン',
		items: [{ name: 'エッグマックマフィン', count: 1 }],
		price: 260
	},
	{
		name: 'ベーコンエッグマックサンド',
		items: [{ name: 'ベーコンエッグマックサンド', count: 1 }],
		price: 300
	},
	{
		name: 'ソーセージエッグマフィン',
		items: [{ name: 'ソーセージエッグマフィン', count: 1 }],
		price: 330
	},
	{
		name: 'ソーセージマフィン',
		items: [{ name: 'ソーセージマフィン', count: 1 }],
		price: 180
	},
	{
		name: 'チキンマックマフィン',
		items: [{ name: 'チキンマックマフィン', count: 1 }],
		price: 210
	},
	{
		name: 'フィレオフィッシュ(朝)',
		items: [{ name: 'フィレオフィッシュ(朝)', count: 1 }],
		price: 400
	},
	{
		name: 'ホットケーキ',
		items: [{ name: 'ホットケーキ', count: 1 }],
		price: 360
	},
	{
		name: 'マックグリドル ソーセージエッグ',
		items: [{ name: 'マックグリドル ソーセージエッグ', count: 1 }],
		price: 360
	},
	{
		name: 'マックグリドル ベーコンエッグ',
		items: [{ name: 'マックグリドル ベーコンエッグ', count: 1 }],
		price: 340
	},
	{
		name: 'マックグリドル ソーセージ',
		items: [{ name: 'マックグリドル ソーセージ', count: 1 }],
		price: 250
	},
	{
		name: 'メガマフィン',
		items: [{ name: 'メガマフィン', count: 1 }],
		price: 420
	},

	// ドリンク類
	{
		name: 'ドリンク',
		items: [
			{
				choices: [
					{ name: 'ドリンクS', count: 1, priceAdjustment: -130 },
					{ name: 'ドリンクM', count: 1, priceAdjustment: 0 },
					{ name: 'ドリンクL', count: 1, priceAdjustment: 50 }
				]
			}
		],
		price: 270
	}
];
