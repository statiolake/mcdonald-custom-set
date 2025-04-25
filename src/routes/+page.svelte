<script lang="ts">
  import { calculateOptimalSet, expandProducts, type ProductInstance } from '$lib/menu';
  import { products } from '$lib/products';

  interface SelectedItem {
    name: string;
    count: number;
  }

  let selectedItems: SelectedItem[] = [];
  let optimalSet: ProductInstance[] = [];
  let allItems: string[] = [];
  let selectedItem: string | null = null;
  let itemCount: number = 1;
  let filterText: string = '';
  let totalPrice: number = 0;

  // すべての商品を展開
  const expandedProducts = expandProducts(products);

  // 全てのアイテムを抽出し、ユニークなリストを作成
  $: allItems = Array.from(new Set(
    expandedProducts.flatMap((product: ProductInstance) =>
      product.items.map(item => item.name)
    )
  )).sort();

  // フィルタリングされたアイテムリスト
  $: filteredItems = allItems.filter(item =>
    item.toLowerCase().includes(filterText.toLowerCase())
  );

  // 合計金額の計算
  $: totalPrice = optimalSet.reduce((sum, set) => sum + set.price, 0);

  function addItem() {
    if (selectedItem) {
      const existingItem = selectedItems.find(item => item.name === selectedItem);
      if (existingItem) {
        selectedItems = selectedItems.map(item =>
          item.name === selectedItem
            ? { ...item, count: item.count + itemCount }
            : item
        );
      } else {
        selectedItems = [...selectedItems, { name: selectedItem, count: itemCount }];
      }
      selectedItem = null;
      itemCount = 1;
      filterText = '';
    }
  }

  function removeItem(index: number) {
    selectedItems = selectedItems.filter((_, i) => i !== index);
  }

  function updateItemCount(index: number, newCount: number) {
    if (newCount > 0) {
      selectedItems = selectedItems.map((item, i) =>
        i === index ? { ...item, count: newCount } : item
      );
    } else {
      removeItem(index);
    }
  }

  function calculateSet() {
    const expandedItems = selectedItems.flatMap(item =>
      Array(item.count).fill(item.name)
    );
    optimalSet = calculateOptimalSet(expandedItems);
  }
</script>

<main class="container">
  <h1>マクドナルド注文最適化アプリ</h1>

  <div class="card item-selector">
    <h2>構成要素を選択</h2>
    <div class="search-box">
      <input
        type="text"
        placeholder="🔍 アイテムを検索..."
        bind:value={filterText}
        on:keydown={(e) => {
          if (e.key === 'Enter' && filteredItems.length > 0) {
            selectedItem = filteredItems[0];
            addItem();
          }
        }}
      />
      {#if filterText && filteredItems.length > 0}
        <div class="suggestions">
          {#each filteredItems as item}
            <button
              class="suggestion-item"
              on:click={() => {
                selectedItem = item;
                addItem();
              }}
            >
              {item}
            </button>
          {/each}
        </div>
      {/if}
    </div>
    <div class="count-selector">
      <label>
        個数:
        <input
          type="number"
          min="1"
          bind:value={itemCount}
          class="count-input"
        />
      </label>
    </div>
  </div>

  <div class="card selected-items">
    <h2>選択された構成要素</h2>
    {#if selectedItems.length === 0}
      <p class="empty-message">アイテムを選択してください</p>
    {:else}
      <ul>
        {#each selectedItems as item, i}
          <li class="selected-item">
            <span>{item.name}</span>
            <div class="item-controls">
              <input
                type="number"
                min="1"
                bind:value={item.count}
                on:change={(e) => updateItemCount(i, parseInt(e.currentTarget.value))}
                class="count-input"
              />
              <button class="remove-button" on:click={() => removeItem(i)}>
                <span class="icon">×</span>
              </button>
            </div>
          </li>
        {/each}
      </ul>
    {/if}
  </div>

  <div class="card optimal-set">
    <h2>最適なセット</h2>
    <button class="calculate-button" on:click={calculateSet}>
      <span class="icon">🔄</span> 最適なセットを計算
    </button>
    {#if optimalSet.length > 0}
      <ul class="result-list">
        {#each optimalSet as set}
          <li class="result-item">
            <div class="set-info">
              <span class="set-name">{set.name}</span>
              <ul class="set-items">
                {#each set.items as item}
                  <li>
                    {item.name} × {item.count}
                  </li>
                {/each}
              </ul>
            </div>
            <span class="set-price">¥{set.price.toLocaleString()}</span>
          </li>
        {/each}
        <li class="total-price">
          <span>合計</span>
          <span>¥{totalPrice.toLocaleString()}</span>
        </li>
      </ul>
    {:else if selectedItems.length > 0}
      <p class="empty-message">「最適なセットを計算」を押してください</p>
    {/if}
  </div>
</main>

<style>
  .container {
    max-width: 800px;
    margin: 2rem auto;
    padding: 0 1rem;
  }

  h1 {
    color: #333;
    text-align: center;
    margin-bottom: 2rem;
    font-size: 1.8rem;
  }

  h2 {
    color: #444;
    margin-bottom: 1rem;
    font-size: 1.3rem;
  }

  .card {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .search-box {
    position: relative;
    width: 100%;
  }

  input[type="text"] {
    width: 100%;
    padding: 0.8rem;
    font-size: 1rem;
    border: 2px solid #eee;
    border-radius: 8px;
    transition: border-color 0.2s;
  }

  input[type="text"]:focus {
    outline: none;
    border-color: #4CAF50;
  }

  .suggestions {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-height: 200px;
    overflow-y: auto;
    z-index: 1000;
  }

  .suggestion-item {
    width: 100%;
    padding: 0.8rem;
    text-align: left;
    border: none;
    background: none;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .suggestion-item:hover {
    background-color: #f5f5f5;
  }

  .count-selector {
    margin-top: 1rem;
  }

  .count-input {
    width: 80px;
    padding: 0.5rem;
    border: 2px solid #eee;
    border-radius: 6px;
    margin: 0 0.5rem;
  }

  .selected-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.8rem;
    margin: 0.5rem 0;
    background: #f8f8f8;
    border-radius: 8px;
    transition: transform 0.2s;
  }

  .selected-item:hover {
    transform: translateX(4px);
  }

  .item-controls {
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }

  .remove-button {
    background: none;
    border: none;
    color: #ff4444;
    cursor: pointer;
    font-size: 1.2rem;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    transition: background-color 0.2s;
  }

  .remove-button:hover {
    background-color: #ffeeee;
  }

  .calculate-button {
    width: 100%;
    padding: 1rem;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    transition: background-color 0.2s;
  }

  .calculate-button:hover {
    background-color: #45a049;
  }

  .result-list {
    margin-top: 1rem;
  }

  .result-item, .total-price {
    display: flex;
    justify-content: space-between;
    padding: 0.8rem;
    border-bottom: 1px solid #eee;
  }

  .set-info {
    flex: 1;
  }

  .set-name {
    font-weight: bold;
    margin-bottom: 0.5rem;
    display: block;
  }

  .set-items {
    font-size: 0.9rem;
    color: #666;
    margin: 0.5rem 0;
    list-style: none;
    padding-left: 1rem;
  }

  .set-items li {
    margin: 0.2rem 0;
  }

  .total-price {
    font-weight: bold;
    border-top: 2px solid #eee;
    margin-top: 0.5rem;
  }

  .set-price {
    color: #4CAF50;
    font-weight: bold;
    margin-left: 1rem;
    white-space: nowrap;
  }

  .empty-message {
    color: #666;
    text-align: center;
    padding: 1rem;
    font-style: italic;
  }

  .icon {
    display: inline-block;
  }

  @media (max-width: 600px) {
    .container {
      margin: 1rem auto;
    }

    .card {
      padding: 1rem;
    }

    h1 {
      font-size: 1.5rem;
    }
  }
</style>
