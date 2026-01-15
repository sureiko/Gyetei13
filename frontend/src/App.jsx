import React, { useState } from 'react';
import { Heart, ShoppingCart, Search, Home, Menu, X } from 'lucide-react';

const BookExchange = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Все жанры');

  const genres = [
    'Все жанры',
    'Фантастика',
    'Детектив',
    'Романтика',
    'Фэнтези',
    'Классика',
    'Триллер'
  ];

  const books = [
    // Фантастика
    { id: 1, title: 'Дюна', author: 'Фрэнк Герберт', price: 850, genre: 'Фантастика', cover: 'https://via.placeholder.com/200x300/90614C/ffffff?text=Dune' },
    { id: 2, title: '1984', author: 'Джордж Оруэлл', price: 650, genre: 'Фантастика', cover: 'https://via.placeholder.com/200x300/90614C/ffffff?text=1984' },
    { id: 3, title: 'Автостопом по галактике', author: 'Дуглас Адамс', price: 700, genre: 'Фантастика', cover: 'https://via.placeholder.com/200x300/90614C/ffffff?text=Hitchhiker' },
    { id: 4, title: 'Нейромант', author: 'Уильям Гибсон', price: 750, genre: 'Фантастика', cover: 'https://via.placeholder.com/200x300/90614C/ffffff?text=Neuromancer' },
    { id: 5, title: 'Марсианин', author: 'Энди Вейер', price: 800, genre: 'Фантастика', cover: 'https://via.placeholder.com/200x300/90614C/ffffff?text=Martian' },
    { id: 6, title: 'Основание', author: 'Айзек Азимов', price: 720, genre: 'Фантастика', cover: 'https://via.placeholder.com/200x300/90614C/ffffff?text=Foundation' },
    
    // Детектив
    { id: 7, title: 'Убийство в восточном экспрессе', author: 'Агата Кристи', price: 680, genre: 'Детектив', cover: 'https://via.placeholder.com/200x300/90614C/ffffff?text=Orient+Express' },
    { id: 8, title: 'Девушка с татуировкой дракона', author: 'Стиг Ларссон', price: 820, genre: 'Детектив', cover: 'https://via.placeholder.com/200x300/90614C/ffffff?text=Dragon+Tattoo' },
    { id: 9, title: 'Шерлок Холмс', author: 'Артур Конан Дойл', price: 600, genre: 'Детектив', cover: 'https://via.placeholder.com/200x300/90614C/ffffff?text=Sherlock' },
    { id: 10, title: 'Код да Винчи', author: 'Дэн Браун', price: 750, genre: 'Детектив', cover: 'https://via.placeholder.com/200x300/90614C/ffffff?text=Da+Vinci' },
    { id: 11, title: 'Исчезнувшая', author: 'Гиллиан Флинн', price: 780, genre: 'Детектив', cover: 'https://via.placeholder.com/200x300/90614C/ffffff?text=Gone+Girl' },
    { id: 12, title: 'Большая четверка', author: 'Агата Кристи', price: 650, genre: 'Детектив', cover: 'https://via.placeholder.com/200x300/90614C/ffffff?text=Big+Four' },

    // Романтика
    { id: 13, title: 'Гордость и предубеждение', author: 'Джейн Остин', price: 670, genre: 'Романтика', cover: 'https://via.placeholder.com/200x300/90614C/ffffff?text=Pride' },
    { id: 14, title: 'Виноваты звезды', author: 'Джон Грин', price: 720, genre: 'Романтика', cover: 'https://via.placeholder.com/200x300/90614C/ffffff?text=Fault+Stars' },
    { id: 15, title: 'До встречи с тобой', author: 'Джоджо Мойес', price: 690, genre: 'Романтика', cover: 'https://via.placeholder.com/200x300/90614C/ffffff?text=Me+Before+You' },
    { id: 16, title: 'Дневник памяти', author: 'Николас Спаркс', price: 650, genre: 'Романтика', cover: 'https://via.placeholder.com/200x300/90614C/ffffff?text=Notebook' },
    { id: 17, title: 'Джейн Эйр', author: 'Шарлотта Бронте', price: 700, genre: 'Романтика', cover: 'https://via.placeholder.com/200x300/90614C/ffffff?text=Jane+Eyre' },
    { id: 18, title: 'Грозовой перевал', author: 'Эмили Бронте', price: 680, genre: 'Романтика', cover: 'https://via.placeholder.com/200x300/90614C/ffffff?text=Wuthering' },

    // Фэнтези
    { id: 19, title: 'Властелин колец', author: 'Дж.Р.Р. Толкин', price: 950, genre: 'Фэнтези', cover: 'https://via.placeholder.com/200x300/90614C/ffffff?text=LOTR' },
    { id: 20, title: 'Гарри Поттер', author: 'Дж.К. Роулинг', price: 850, genre: 'Фэнтези', cover: 'https://via.placeholder.com/200x300/90614C/ffffff?text=Harry+Potter' },
    { id: 21, title: 'Хоббит', author: 'Дж.Р.Р. Толкин', price: 720, genre: 'Фэнтези', cover: 'https://via.placeholder.com/200x300/90614C/ffffff?text=Hobbit' },
    { id: 22, title: 'Игра престолов', author: 'Джордж Мартин', price: 900, genre: 'Фэнтези', cover: 'https://via.placeholder.com/200x300/90614C/ffffff?text=GoT' },
    { id: 23, title: 'Ведьмак', author: 'Анджей Сапковский', price: 780, genre: 'Фэнтези', cover: 'https://via.placeholder.com/200x300/90614C/ffffff?text=Witcher' },
    { id: 24, title: 'Хроники Нарнии', author: 'К.С. Льюис', price: 750, genre: 'Фэнтези', cover: 'https://via.placeholder.com/200x300/90614C/ffffff?text=Narnia' },

    // Классика
    { id: 25, title: 'Война и мир', author: 'Лев Толстой', price: 1100, genre: 'Классика', cover: 'https://via.placeholder.com/200x300/90614C/ffffff?text=War+Peace' },
    { id: 26, title: 'Преступление и наказание', author: 'Федор Достоевский', price: 800, genre: 'Классика', cover: 'https://via.placeholder.com/200x300/90614C/ffffff?text=Crime' },
    { id: 27, title: 'Анна Каренина', author: 'Лев Толстой', price: 850, genre: 'Классика', cover: 'https://via.placeholder.com/200x300/90614C/ffffff?text=Anna' },
    { id: 28, title: 'Мастер и Маргарита', author: 'Михаил Булгаков', price: 750, genre: 'Классика', cover: 'https://via.placeholder.com/200x300/90614C/ffffff?text=Master' },
    { id: 29, title: 'Граф Монте-Кристо', author: 'Александр Дюма', price: 900, genre: 'Классика', cover: 'https://via.placeholder.com/200x300/90614C/ffffff?text=Monte+Cristo' },
    { id: 30, title: 'Портрет Дориана Грея', author: 'Оскар Уайльд', price: 650, genre: 'Классика', cover: 'https://via.placeholder.com/200x300/90614C/ffffff?text=Dorian' },

    // Триллер
    { id: 31, title: 'Молчание ягнят', author: 'Томас Харрис', price: 780, genre: 'Триллер', cover: 'https://via.placeholder.com/200x300/90614C/ffffff?text=Silence' },
    { id: 32, title: 'Девушка в поезде', author: 'Пола Хокинс', price: 720, genre: 'Триллер', cover: 'https://via.placeholder.com/200x300/90614C/ffffff?text=Girl+Train' },
    { id: 33, title: 'Зов кукушки', author: 'Роберт Гэлбрейт', price: 750, genre: 'Триллер', cover: 'https://via.placeholder.com/200x300/90614C/ffffff?text=Cuckoo' },
    { id: 34, title: 'Тринадцатая сказка', author: 'Диана Сеттерфилд', price: 700, genre: 'Триллер', cover: 'https://via.placeholder.com/200x300/90614C/ffffff?text=13th+Tale' },
    { id: 35, title: 'Острые предметы', author: 'Гиллиан Флинн', price: 690, genre: 'Триллер', cover: 'https://via.placeholder.com/200x300/90614C/ffffff?text=Sharp' },
    { id: 36, title: 'Психопат', author: 'Кит Абель', price: 730, genre: 'Триллер', cover: 'https://via.placeholder.com/200x300/90614C/ffffff?text=Psycho' }
  ];

  const addToCart = (book) => {
    setCart([...cart, book]);
  };

  const toggleFavorite = (book) => {
    if (favorites.find(b => b.id === book.id)) {
      setFavorites(favorites.filter(b => b.id !== book.id));
    } else {
      setFavorites([...favorites, book]);
    }
  };

  const isFavorite = (bookId) => {
    return favorites.some(b => b.id === bookId);
  };

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === 'Все жанры' || book.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const displayBooks = () => {
    if (activeTab === 'cart') return cart;
    if (activeTab === 'favorites') return favorites;
    return filteredBooks;
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#D3AF9E', minHeight: '100vh', color: '#5A3320' }}>
      {/* Header */}
      <div style={{ 
        backgroundColor: '#90614C', 
        padding: '20px', 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
      }}>
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{ 
            background: 'none', 
            border: 'none', 
            color: '#D3AF9E', 
            cursor: 'pointer',
            padding: '8px'
          }}
        >
          {sidebarOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
        <h1 style={{ margin: 0, color: '#D3AF9E', fontSize: '32px', fontWeight: '300', letterSpacing: '2px' }}>
          BookExchange
        </h1>
        <div style={{ width: '44px' }}></div>
      </div>

      {/* Sidebar */}
      <div style={{
        position: 'fixed',
        left: sidebarOpen ? '0' : '-280px',
        top: 0,
        width: '280px',
        height: '100vh',
        backgroundColor: '#90614C',
        transition: 'left 0.3s ease',
        zIndex: 1000,
        padding: '80px 20px 20px',
        boxShadow: '2px 0 8px rgba(0,0,0,0.3)'
      }}>
        {[
          { id: 'home', icon: Home, label: 'Главная' },
          { id: 'cart', icon: ShoppingCart, label: 'Корзина' },
          { id: 'search', icon: Search, label: 'Поиск' },
          { id: 'favorites', icon: Heart, label: 'Понравившееся' }
        ].map(item => (
          <button
            key={item.id}
            onClick={() => {
              setActiveTab(item.id);
              setSidebarOpen(false);
            }}
            style={{
              width: '100%',
              padding: '16px',
              marginBottom: '12px',
              backgroundColor: activeTab === item.id ? '#5A3320' : 'transparent',
              border: 'none',
              color: '#D3AF9E',
              fontSize: '18px',
              cursor: 'pointer',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              transition: 'all 0.3s ease',
              fontWeight: '300'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.backgroundColor = activeTab === item.id ? '#5A3320' : 'rgba(90, 51, 32, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.backgroundColor = activeTab === item.id ? '#5A3320' : 'transparent';
            }}
          >
            <item.icon size={22} />
            {item.label}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div style={{ padding: '30px', maxWidth: '1400px', margin: '0 auto' }}>
        {/* Search Bar */}
        {activeTab === 'search' && (
          <div style={{ marginBottom: '30px' }}>
            <input
              type="text"
              placeholder="Поиск книг по названию или автору..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '16px',
                fontSize: '16px',
                border: '2px solid #90614C',
                borderRadius: '8px',
                backgroundColor: 'white',
                color: '#5A3320',
                outline: 'none'
              }}
            />
          </div>
        )}

        {/* Genre Filter */}
        {activeTab === 'home' && (
          <div style={{ marginBottom: '30px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {genres.map(genre => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                style={{
                  padding: '12px 24px',
                  backgroundColor: selectedGenre === genre ? '#90614C' : 'white',
                  color: selectedGenre === genre ? '#D3AF9E' : '#5A3320',
                  border: '2px solid #90614C',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '15px',
                  fontWeight: '300',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                {genre}
              </button>
            ))}
          </div>
        )}

        {/* Title */}
        <h2 style={{ marginBottom: '30px', fontSize: '28px', fontWeight: '300', letterSpacing: '1px' }}>
          {activeTab === 'cart' ? 'Корзина' : 
           activeTab === 'favorites' ? 'Понравившееся' : 
           activeTab === 'search' ? 'Результаты поиска' :
           selectedGenre === 'Все жанры' ? 'Все книги' : selectedGenre}
        </h2>

        {/* Books Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', 
          gap: '30px' 
        }}>
          {displayBooks().map(book => (
            <div key={book.id} style={{ position: 'relative' }}>
              {/* Favorite Heart */}
              <button
                onClick={() => toggleFavorite(book)}
                style={{
                  position: 'absolute',
                  top: '10px',
                  left: '10px',
                  background: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 10,
                  boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                  transition: 'transform 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <Heart 
                  size={22} 
                  fill={isFavorite(book.id) ? '#90614C' : 'none'} 
                  color="#90614C" 
                />
              </button>

              <div style={{ 
                backgroundColor: 'white', 
                borderRadius: '12px', 
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                transition: 'transform 0.3s ease'
              }}>
                {/* Book Cover Placeholder */}
                <div style={{ 
                  width: '100%', 
                  height: '320px', 
                  backgroundColor: '#90614C',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#D3AF9E',
                  fontSize: '14px'
                }}>
                  <img src={book.cover} alt={book.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                <div style={{ padding: '16px' }}>
                  <h3 style={{ 
                    margin: '0 0 8px 0', 
                    fontSize: '18px',
                    fontWeight: '400',
                    color: '#5A3320'
                  }}>
                    {book.title}
                  </h3>
                  <p style={{ 
                    margin: '0 0 16px 0', 
                    fontSize: '14px',
                    color: '#90614C',
                    fontWeight: '300'
                  }}>
                    {book.author}
                  </p>

                  <button
                    onClick={() => addToCart(book)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      backgroundColor: '#90614C',
                      color: '#D3AF9E',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '16px',
                      fontWeight: '300',
                      marginBottom: '8px',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.backgroundColor = '#5A3320';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.backgroundColor = '#90614C';
                    }}
                  >
                    Купить
                  </button>

                  <p style={{ 
                    margin: 0, 
                    textAlign: 'center',
                    fontSize: '18px',
                    fontWeight: '400',
                    color: '#5A3320'
                  }}>
                    {book.price} сом
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {displayBooks().length === 0 && (
          <p style={{ textAlign: 'center', fontSize: '18px', marginTop: '60px', color: '#90614C' }}>
            {activeTab === 'cart' ? 'Корзина пуста' :
             activeTab === 'favorites' ? 'Нет избранных книг' :
             'Книги не найдены'}
          </p>
        )}
      </div>
    </div>
  );
};

export default BookExchange;