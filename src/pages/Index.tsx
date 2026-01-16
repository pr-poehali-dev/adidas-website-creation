import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  badge?: string;
  description?: string;
  sizes?: string[];
  colors?: string[];
}

const products: Product[] = [
  { id: 1, name: 'Ultraboost 22', category: 'Обувь', price: 14999, image: 'https://cdn.poehali.dev/projects/6510de84-b402-49fc-ac8c-942d701449e8/files/834669f9-6775-4cd5-b7a3-190e000e1ff0.jpg', badge: 'NEW', description: 'Революционная беговая обувь с технологией энергетического возврата BOOST. Идеальна для марафонов и длительных тренировок.', sizes: ['40', '41', '42', '43', '44', '45'], colors: ['Черный', 'Белый', 'Серый'] },
  { id: 2, name: 'NMD_R1', category: 'Обувь', price: 12999, image: 'https://cdn.poehali.dev/projects/6510de84-b402-49fc-ac8c-942d701449e8/files/834669f9-6775-4cd5-b7a3-190e000e1ff0.jpg', description: 'Легендарные кроссовки с уникальным дизайном и непревзойденным комфортом для городских улиц.', sizes: ['39', '40', '41', '42', '43', '44'], colors: ['Черный', 'Синий'] },
  { id: 3, name: 'Stan Smith', category: 'Обувь', price: 8999, image: 'https://cdn.poehali.dev/projects/6510de84-b402-49fc-ac8c-942d701449e8/files/834669f9-6775-4cd5-b7a3-190e000e1ff0.jpg', description: 'Классические теннисные кроссовки с минималистичным дизайном. Икона стиля с 1971 года.', sizes: ['38', '39', '40', '41', '42', '43'], colors: ['Белый', 'Белый/Зелёный'] },
  { id: 4, name: 'Худи Z.N.E.', category: 'Одежда', price: 6999, image: 'https://cdn.poehali.dev/projects/6510de84-b402-49fc-ac8c-942d701449e8/files/2902fd2b-8681-4aa5-bcca-996de78ff18f.jpg', badge: 'HOT', description: 'Премиальная толстовка с капюшоном из серии Zero Negative Energy. Максимальная концентрация перед тренировкой.', sizes: ['S', 'M', 'L', 'XL', 'XXL'], colors: ['Черный', 'Серый', 'Синий'] },
  { id: 5, name: 'Спортивная куртка', category: 'Одежда', price: 9999, image: 'https://cdn.poehali.dev/projects/6510de84-b402-49fc-ac8c-942d701449e8/files/2902fd2b-8681-4aa5-bcca-996de78ff18f.jpg', description: 'Ветрозащитная куртка с технологией Climaproof. Защита от непогоды в любых условиях.', sizes: ['S', 'M', 'L', 'XL'], colors: ['Черный', 'Красный'] },
  { id: 6, name: 'Футболка Trefoil', category: 'Одежда', price: 2999, image: 'https://cdn.poehali.dev/projects/6510de84-b402-49fc-ac8c-942d701449e8/files/2902fd2b-8681-4aa5-bcca-996de78ff18f.jpg', description: 'Классическая футболка с культовым логотипом трилистника. Мягкий хлопок для ежедневного ношения.', sizes: ['S', 'M', 'L', 'XL'], colors: ['Черный', 'Белый', 'Серый'] },
  { id: 7, name: 'Рюкзак Classic', category: 'Аксессуары', price: 3499, image: 'https://cdn.poehali.dev/projects/6510de84-b402-49fc-ac8c-942d701449e8/files/d28919fc-2e71-41aa-849f-c8db9ac6cef9.jpg', description: 'Вместительный рюкзак с множеством карманов. Подходит для тренировок, учебы и путешествий.', colors: ['Черный', 'Синий'] },
  { id: 8, name: 'Спортивная сумка', category: 'Аксессуары', price: 4999, image: 'https://cdn.poehali.dev/projects/6510de84-b402-49fc-ac8c-942d701449e8/files/d28919fc-2e71-41aa-849f-c8db9ac6cef9.jpg', description: 'Прочная спортивная сумка с отдельным отделением для обуви. Идеальна для зала и поездок.', colors: ['Черный', 'Серый', 'Красный'] },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [cart, setCart] = useState<Product[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');

  const categories = ['Все', 'Обувь', 'Одежда', 'Аксессуары'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Все' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 bg-black text-white z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold tracking-tight">adidas</div>
          
          <nav className="hidden md:flex items-center gap-8">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-sm font-medium transition-colors hover:text-gray-300 ${
                  selectedCategory === cat ? 'border-b-2 border-white' : ''
                }`}
              >
                {cat}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <div className="relative hidden lg:block">
              <Input
                type="text"
                placeholder="Поиск..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
              <Icon name="Search" className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60" size={18} />
            </div>
            
            <button
              onClick={() => setShowCart(!showCart)}
              className="relative hover:scale-110 transition-transform"
            >
              <Icon name="ShoppingBag" size={24} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="md:hidden border-t border-white/10">
          <div className="container mx-auto px-4 py-3">
            <Input
              type="text"
              placeholder="Поиск..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/10 border-white/20 text-white placeholder:text-white/60"
            />
          </div>
        </div>
      </header>

      <section className="pt-24 pb-16 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-5xl md:text-7xl font-black leading-tight">
                IMPOSSIBLE<br />IS NOTHING
              </h1>
              <p className="text-xl text-gray-300">
                Новая коллекция спортивной одежды и обуви для максимальной производительности
              </p>
              <Button size="lg" className="bg-white text-black hover:bg-gray-200 font-bold">
                Смотреть коллекцию
              </Button>
            </div>
            <div className="relative h-[400px] md:h-[500px] animate-scale-in">
              <img
                src="https://cdn.poehali.dev/projects/6510de84-b402-49fc-ac8c-942d701449e8/files/834669f9-6775-4cd5-b7a3-190e000e1ff0.jpg"
                alt="Hero"
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex gap-4 overflow-x-auto pb-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-black text-white'
                    : 'bg-white text-black hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">
            {selectedCategory === 'Все' ? 'Все товары' : selectedCategory}
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <div
                key={product.id}
                className="group cursor-pointer animate-fade-in"
                onClick={() => setSelectedProduct(product)}
              >
                <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {product.badge && (
                    <Badge className="absolute top-3 left-3 bg-accent text-white border-0">
                      {product.badge}
                    </Badge>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    className="absolute bottom-3 right-3 bg-black text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
                  >
                    <Icon name="Plus" size={20} />
                  </button>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">{product.category}</p>
                  <h3 className="font-medium mb-2">{product.name}</h3>
                  <p className="font-bold">{product.price.toLocaleString('ru-RU')} ₽</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {showCart && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end" onClick={() => setShowCart(false)}>
          <div
            className="bg-white w-full max-w-md h-full overflow-y-auto animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Корзина</h2>
              <button onClick={() => setShowCart(false)}>
                <Icon name="X" size={24} />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                <Icon name="ShoppingBag" size={64} className="text-gray-300 mb-4" />
                <p className="text-gray-600">Корзина пуста</p>
              </div>
            ) : (
              <>
                <div className="p-6 space-y-4">
                  {cart.map((item, index) => (
                    <div key={`${item.id}-${index}`} className="flex gap-4 border-b pb-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium mb-1">{item.name}</h3>
                        <p className="text-sm text-gray-600">{item.category}</p>
                        <p className="font-bold mt-2">{item.price.toLocaleString('ru-RU')} ₽</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-black"
                      >
                        <Icon name="Trash2" size={20} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="sticky bottom-0 bg-white border-t p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-medium">Итого:</span>
                    <span className="text-2xl font-bold">{totalPrice.toLocaleString('ru-RU')} ₽</span>
                  </div>
                  <Button className="w-full bg-black hover:bg-gray-800 text-white font-bold" size="lg">
                    Оформить заказ
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <footer className="bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-xl mb-4">adidas</h3>
              <p className="text-gray-400">
                Спортивная одежда и обувь для профессионалов и любителей
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Каталог</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Обувь</a></li>
                <li><a href="#" className="hover:text-white">Одежда</a></li>
                <li><a href="#" className="hover:text-white">Аксессуары</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Помощь</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Доставка</a></li>
                <li><a href="#" className="hover:text-white">Возврат</a></li>
                <li><a href="#" className="hover:text-white">Контакты</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Социальные сети</h4>
              <div className="flex gap-4">
                <a href="#" className="hover:text-gray-300">
                  <Icon name="Instagram" size={24} />
                </a>
                <a href="#" className="hover:text-gray-300">
                  <Icon name="Facebook" size={24} />
                </a>
                <a href="#" className="hover:text-gray-300">
                  <Icon name="Youtube" size={24} />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400">
            <p>© 2026 adidas. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;