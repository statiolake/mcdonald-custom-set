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
        placeholder="アイテムを検索..."
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
       最適なセットを計算
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
  :global(body) {
    background-color: #f7f7f7;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  }

  .container {
    max-width: 800px;
    margin: 2rem auto;
    padding: 0 1rem;
  }

  h1 {
    color: #1a1a1a;
    text-align: center;
    margin-bottom: 2.5rem;
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: -0.5px;
  }

  h2 {
    color: #1a1a1a;
    margin-bottom: 1.25rem;
    font-size: 1.4rem;
    font-weight: 600;
    letter-spacing: -0.3px;
  }

  .card {
    background: white;
    border-radius: 16px;
    padding: 1.75rem;
    margin-bottom: 1.75rem;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .card:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
  }

  .search-box {
    position: relative;
    width: 100%;
  }

  input[type="text"] {
    width: 100%;
    padding: 0.875rem;
    font-size: 1rem;
    border: 2px solid #e5e5e5;
    border-radius: 12px;
    transition: all 0.2s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
    box-sizing: border-box;
  }

  input[type="text"]:focus {
    outline: none;
    border-color: #2196F3;
    box-shadow: 0 4px 12px rgba(33, 150, 243, 0.1);
  }

  .suggestions {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    right: 0;
    background: white;
    border-radius: 12px;
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
    max-height: 240px;
    overflow-y: auto;
    z-index: 1000;
  }

  .suggestion-item {
    width: 100%;
    padding: 1rem;
    text-align: left;
    border: none;
    background: none;
    cursor: pointer;
    transition: all 0.2s ease;
    color: #1a1a1a;
  }

  .suggestion-item:hover {
    background-color: #FFC72C;
    color: #1a1a1a;
  }

  .count-selector {
    margin-top: 1.25rem;
  }

  .count-input {
    width: 100px;
    padding: 0.75rem;
    border: 2px solid #e5e5e5;
    border-radius: 8px;
    margin: 0 0.75rem;
    font-size: 1rem;
    transition: all 0.2s ease;
  }

  .count-input:focus {
    outline: none;
    border-color: #DA291C;
    box-shadow: 0 4px 12px rgba(218, 41, 28, 0.1);
  }

  .selected-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    margin: 0.75rem 0;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    transition: all 0.2s ease;
  }

  .selected-item:hover {
    transform: translateX(4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  .item-controls {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .remove-button {
    background: none;
    border: none;
    color: #2196F3;
    cursor: pointer;
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    border-radius: 8px;
    transition: all 0.2s ease;
  }

  .remove-button:hover {
    background-color: rgba(33, 150, 243, 0.1);
  }

  .calculate-button {
    width: 100%;
    padding: 1.25rem;
    background-color: #2196F3;
    color: white;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    font-size: 1.1rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    transition: all 0.2s ease;
    box-shadow: 0 4px 12px rgba(33, 150, 243, 0.2);
  }

  .calculate-button:hover {
    background-color: #1976D2;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(33, 150, 243, 0.3);
  }

  .result-list {
    margin-top: 1.25rem;
  }

  .result-item, .total-price {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    border-bottom: 1px solid #e5e5e5;
  }

  .set-info {
    flex: 1;
  }

  .set-name {
    font-weight: 600;
    margin-bottom: 0.75rem;
    display: block;
    color: #1a1a1a;
  }

  .set-items {
    font-size: 0.95rem;
    color: #666;
    margin: 0.75rem 0;
    list-style: none;
    padding-left: 1.25rem;
  }

  .set-items li {
    margin: 0.4rem 0;
    transition: color 0.2s ease;
  }

  .set-items li:hover {
    color: #1a1a1a;
  }

  .total-price {
    font-weight: 600;
    border-top: 2px solid #e5e5e5;
    margin-top: 0.75rem;
    padding-top: 1.25rem;
    font-size: 1.1rem;
  }

  .set-price {
    color: #2196F3;
    font-weight: 600;
    margin-left: 1.25rem;
    white-space: nowrap;
  }

  .empty-message {
    color: #666;
    text-align: center;
    padding: 1.25rem;
    font-style: normal;
    font-weight: 500;
  }

  .icon {
    display: inline-block;
    font-size: 1.2rem;
  }

  @media (max-width: 600px) {
    .container {
      margin: 1rem auto;
    }

    .card {
      padding: 1.25rem;
      border-radius: 12px;
    }

    h1 {
      font-size: 1.6rem;
      margin-bottom: 2rem;
    }

    .calculate-button {
      padding: 1rem;
    }
  }
</style>
