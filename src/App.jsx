import { useState, useEffect, useMemo } from "react";
import { Heart, Calendar, Music2, Camera, Gamepad2, Trophy, Target, MessageCircle, Sparkles, Star, Gift } from "lucide-react";

const COUPLE = {
  you: "Rafiou",
  partner: "Djenabou",
  startDate: new Date("2025-05-15"),
  hashtag: "#PourToujours",
};

const TIMELINE = [
  { date: "15 Mai 2025", title: "Premier Message", desc: "Un message, une reponse, et tout a commencé.", emoji: "✨" },
  { date: "20 juillet 2025", title: "Premier <<Je T'aime>>", desc: "Première fois qu'on s'ait dit s'aime", emoji: "💕" },
];

const LOVE_MESSAGES = [
  "Tu es la plus belle chose qui me soit arrivée ❤️",
  "Chaque jour avec toi est magique ✨", 
  "Ton sourire illumine ma journée ☀️",
  "Je t'aime plus que les mots ne peuvent le dire 💕",
  "Tu es mon monde entier 🌍",
  "Avec toi, tout est possible 💫",
  "Mon cœur bat pour toi 💓"
];

const TRUTH_QUESTIONS = [
  "Quel est ton souvenir préféré avec moi ?",
  "Qu'est-ce qui t'a attiré chez moi en premier ?",
  "Quel est ton rêve le plus fou pour nous deux ?",
  "Quelle est la chose la plus mignonne que je fais ?",
  "Si tu pouvais revivre un moment avec moi, lequel choisirais-tu ?",
  "Quelle est ma qualité que tu préfères ?",
  "Quel voyage aimerais-tu faire avec moi ?"
];

const DARE_CHALLENGES = [
  "Fais-moi un compliment en chantant 🎵",
  "Imite notre premier baiser 😘",
  "Danse pendant 30 secondes 💃",
  "Raconte une blague (même nulle !) 😂",
  "Fais un selfie rigolo 📸",
  "Imite un animal pendant 10 secondes 🐯",
  "Chante notre chanson préférée 🎶"
];

const QUIZ_QUESTIONS = [
  {
    question: "Quelle est la couleur préférée de Djenabou ?",
    options: ["Rouge", "Rose", "Bleu", "Violet"],
    correct: 1
  },
  {
    question: "Où avons-nous eu notre premier rendez-vous ?",
    options: ["Au café", "Au parc", "Au cinéma", "À la plage"],
    correct: 0
  },
  {
    question: "Quel est le plat préféré de Rafiou ?",
    options: ["Pizza", "Pâtes", "Sushi", "Burger"],
    correct: 2
  },
  {
    question: "Quelle est notre chanson préférée ?",
    options: ["Perfect - Ed Sheeran", "All of Me - John Legend", "Thinking Out Loud", "Photograph"],
    correct: 1
  }
];

function useDaysTogether(startDate) {
  const [today, setToday] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setToday(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);
  
  return useMemo(() => {
    const diffTime = today.getTime() - startDate.getTime();
    return Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));
  }, [today, startDate]);
}

function FloatingMessage({ message, onComplete }) {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 300);
    }, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);
  
  return (
    <div className={`fixed top-20 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-full shadow-lg z-50 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
      {message}
    </div>
  );
}

function checkWinner(board) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  for (let [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xTurn, setXTurn] = useState(true);
  const [gameStats, setGameStats] = useState({ rafiou: 0, djenabou: 0, draws: 0 });
  
  const winner = checkWinner(board);
  
  function handleClick(i) {
    if (board[i] || winner) return;
    const newBoard = [...board];
    newBoard[i] = xTurn ? "❌" : "⭕";
    setBoard(newBoard);
    setXTurn(!xTurn);
    
    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setTimeout(() => {
        setGameStats(prev => ({
          ...prev,
          [gameWinner === "❌" ? "rafiou" : "djenabou"]: prev[gameWinner === "❌" ? "rafiou" : "djenabou"] + 1
        }));
      }, 500);
    } else if (newBoard.every(cell => cell)) {
      setTimeout(() => {
        setGameStats(prev => ({ ...prev, draws: prev.draws + 1 }));
      }, 500);
    }
  }
  
  function resetGame() {
    setBoard(Array(9).fill(null));
    setXTurn(true);
  }
  
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
        <div className="grid grid-cols-3 gap-1 text-center mb-2">
          <div className="text-pink-300">Rafiou: {gameStats.rafiou}</div>
          <div className="text-purple-300">Nuls: {gameStats.draws}</div>
          <div className="text-blue-300">Djenabou: {gameStats.djenabou}</div>
        </div>
      </div>
      
      <div className="text-lg font-semibold mb-2">
        {winner ? 
          `${winner === "❌" ? "Rafiou" : "Djenabou"} a gagné ! 🎉` : 
          `Tour de ${xTurn ? "Rafiou (❌)" : "Djenabou (⭕)"}`
        }
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        {board.map((cell, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className="w-16 h-16 bg-white/20 hover:bg-white/30 text-2xl font-bold rounded-lg flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-105"
          >
            {cell}
          </button>
        ))}
      </div>
      
      <button
        onClick={resetGame}
        className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-full shadow-lg transition-all duration-200 hover:scale-105"
      >
        Nouvelle Partie
      </button>
    </div>
  );
}

function MemoryGame() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  
  const emojis = ["❤️", "💕", "💖", "💘", "💝", "💗", "💓", "💞"];
  
  useEffect(() => {
    initGame();
  }, []);
  
  function initGame() {
    const shuffled = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({ id: index, emoji, isFlipped: false }));
    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setGameWon(false);
  }
  
  function handleCardClick(cardId) {
    if (flipped.length === 2 || flipped.includes(cardId) || matched.includes(cardId)) return;
    
    const newFlipped = [...flipped, cardId];
    setFlipped(newFlipped);
    
    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      const [first, second] = newFlipped;
      if (cards[first].emoji === cards[second].emoji) {
        setMatched([...matched, first, second]);
        setFlipped([]);
        if (matched.length + 2 === cards.length) {
          setGameWon(true);
        }
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  }
  
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="text-center">
        <div className="text-lg font-semibold mb-2">Coups: {moves}</div>
        {gameWon && <div className="text-xl text-yellow-300 animate-pulse">🎉 Bravo ! Jeu terminé ! 🎉</div>}
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`w-16 h-16 rounded-lg shadow-lg transition-all duration-300 text-2xl flex items-center justify-center ${
              flipped.includes(card.id) || matched.includes(card.id)
                ? 'bg-white/90 text-gray-800 transform rotate-0'
                : 'bg-gradient-to-br from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 transform hover:scale-105'
            }`}
          >
            {(flipped.includes(card.id) || matched.includes(card.id)) ? card.emoji : '?'}
          </button>
        ))}
      </div>
      
      <button
        onClick={initGame}
        className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full shadow-lg transition-all duration-200 hover:scale-105"
      >
        Nouvelle Partie
      </button>
    </div>
  );
}

export default function InteractiveLoveSite() {
  const days = useDaysTogether(COUPLE.startDate);
  const [activeTab, setActiveTab] = useState('home');
  const [loveClicks, setLoveClicks] = useState(0);
  const [floatingMessages, setFloatingMessages] = useState([]);
  const [customMemories, setCustomMemories] = useState([]);
  const [currentTruthDare, setCurrentTruthDare] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState(false);
  
  function addFloatingMessage(message) {
    const id = Date.now();
    setFloatingMessages(prev => [...prev, { id, message }]);
  }
  
  function removeFloatingMessage(id) {
    setFloatingMessages(prev => prev.filter(msg => msg.id !== id));
  }
  
  function handleLoveClick() {
    setLoveClicks(prev => prev + 1);
    const randomMessage = LOVE_MESSAGES[Math.floor(Math.random() * LOVE_MESSAGES.length)];
    addFloatingMessage(randomMessage);
  }
  
  function addCustomMemory() {
    const title = prompt("Titre du souvenir:");
    const description = prompt("Description:");
    if (title && description) {
      const newMemory = {
        id: Date.now(),
        date: new Date().toLocaleDateString('fr-FR'),
        title,
        desc: description,
        emoji: "💫"
      };
      setCustomMemories(prev => [...prev, newMemory]);
      addFloatingMessage("Nouveau souvenir ajouté ! 🎉");
    }
  }
  
  function getTruthDare(type) {
    if (type === 'truth') {
      const question = TRUTH_QUESTIONS[Math.floor(Math.random() * TRUTH_QUESTIONS.length)];
      setCurrentTruthDare({ type: 'Vérité', content: question });
    } else {
      const dare = DARE_CHALLENGES[Math.floor(Math.random() * DARE_CHALLENGES.length)];
      setCurrentTruthDare({ type: 'Action', content: dare });
    }
  }
  
  function handleQuizAnswer(selectedIndex) {
    if (quizAnswered) return;
    
    setQuizAnswered(true);
    if (selectedIndex === QUIZ_QUESTIONS[currentQuiz].correct) {
      setQuizScore(prev => prev + 1);
      addFloatingMessage("Bonne réponse ! 🎉");
    } else {
      addFloatingMessage("Oops, essaie encore ! 😅");
    }
    
    setTimeout(() => {
      nextQuiz();
    }, 2000);
  }
  
  function nextQuiz() {
    setCurrentQuiz(prev => (prev + 1) % QUIZ_QUESTIONS.length);
    setQuizAnswered(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 text-white relative overflow-hidden">
      {/* Particules d'arrière-plan */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          >
            ✨
          </div>
        ))}
      </div>

      {/* Messages flottants */}
      {floatingMessages.map(msg => (
        <FloatingMessage 
          key={msg.id} 
          message={msg.message} 
          onComplete={() => removeFloatingMessage(msg.id)} 
        />
      ))}

      {/* Navigation */}
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-md rounded-full p-2 z-40 border border-white/20">
        <div className="flex space-x-1">
          {[
            { id: 'home', icon: Heart, label: 'Accueil' },
            { id: 'timeline', icon: Calendar, label: 'Timeline' },
            { id: 'games', icon: Gamepad2, label: 'Jeux' },
            { id: 'photos', icon: Camera, label: 'Photos' },
            { id: 'quiz', icon: Target, label: 'Quiz' },
            { id: 'music', icon: Music2, label: 'Musique' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
                activeTab === tab.id 
                  ? 'bg-white/20 text-white scale-105' 
                  : 'hover:bg-white/10 text-white/70 hover:text-white'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="hidden md:inline text-sm">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <div className="container mx-auto px-6 pt-20 pb-10">
        {/* Page d'accueil */}
        {activeTab === 'home' && (
          <div className="text-center space-y-8">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-pink-200 to-purple-200 bg-clip-text text-transparent">
                {COUPLE.you} <Heart className="w-12 h-12 inline animate-pulse text-pink-300" /> {COUPLE.partner}
              </h1>
              <p className="text-2xl mb-4">Ensemble depuis <span className="font-bold text-yellow-300">{days}</span> jours magiques</p>
              <p className="text-lg text-purple-200">{COUPLE.city}</p>
              <p className="text-2xl font-bold text-yellow-300 mt-2">{COUPLE.hashtag}</p>
            </div>

            {/* Compteur de clics d'amour */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              <h2 className="text-2xl font-bold mb-4 flex items-center justify-center space-x-2">
                <Sparkles className="w-6 h-6" />
                <span>Compteur d'Amour</span>
                <Sparkles className="w-6 h-6" />
              </h2>
              <button
                onClick={handleLoveClick}
                className="w-32 h-32 rounded-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-4xl shadow-xl transition-all duration-200 hover:scale-110 active:scale-95 mx-auto block mb-4 border-4 border-white/30"
              >
                💖
              </button>
              <p className="text-xl">Clics d'amour: <span className="font-bold text-yellow-300">{loveClicks}</span></p>
            </div>

            {/* Stats du couple */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <Calendar className="w-8 h-8 mx-auto mb-2 text-blue-300" />
                <h3 className="font-bold">Jours Ensemble</h3>
                <p className="text-2xl font-bold text-yellow-300">{days}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <Heart className="w-8 h-8 mx-auto mb-2 text-pink-300" />
                <h3 className="font-bold">Clics d'Amour</h3>
                <p className="text-2xl font-bold text-yellow-300">{loveClicks}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <Star className="w-8 h-8 mx-auto mb-2 text-purple-300" />
                <h3 className="font-bold">Souvenirs</h3>
                <p className="text-2xl font-bold text-yellow-300">{TIMELINE.length + customMemories.length}</p>
              </div>
            </div>
          </div>
        )}

        {/* Timeline */}
        {activeTab === 'timeline' && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-8 flex items-center justify-center space-x-3">
              <Calendar className="w-8 h-8" />
              <span>Notre Histoire</span>
            </h2>
            
            <div className="space-y-6">
              {[...TIMELINE, ...customMemories].map((event, idx) => (
                <div
                  key={event.id || idx}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                  onClick={() => addFloatingMessage("Quel beau souvenir ! 💕")}
                >
                  <div className="flex items-start space-x-4">
                    <div className="text-4xl">{event.emoji}</div>
                    <div className="flex-1">
                      <h3 className="font-bold text-xl mb-2">{event.date} - {event.title}</h3>
                      <p className="text-purple-100">{event.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <button
                onClick={addCustomMemory}
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full shadow-lg transition-all duration-200 hover:scale-105"
              >
                <Gift className="w-5 h-5 inline mr-2" />
                Ajouter un Souvenir
              </button>
            </div>
          </div>
        )}

        {/* Jeux */}
        {activeTab === 'games' && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-8 flex items-center justify-center space-x-3">
              <Gamepad2 className="w-8 h-8" />
              <span>Jeux pour Couple</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Morpion */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <h3 className="text-2xl font-bold text-center mb-6 flex items-center justify-center space-x-2">
                  <Trophy className="w-6 h-6" />
                  <span>Morpion</span>
                </h3>
                <TicTacToe />
              </div>
              
              {/* Jeu de mémoire */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <h3 className="text-2xl font-bold text-center mb-6 flex items-center justify-center space-x-2">
                  <Star className="w-6 h-6" />
                  <span>Mémoire</span>
                </h3>
                <MemoryGame />
              </div>
            </div>
            
            {/* Action ou Vérité */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 mt-8">
              <h3 className="text-2xl font-bold text-center mb-6 flex items-center justify-center space-x-2">
                <MessageCircle className="w-6 h-6" />
                <span>Action ou Vérité</span>
              </h3>
              
              <div className="text-center space-y-4">
                {currentTruthDare ? (
                  <div className="bg-white/20 rounded-lg p-6 max-w-md mx-auto">
                    <div className="text-lg font-bold mb-2 text-yellow-300">{currentTruthDare.type}</div>
                    <div className="text-lg">{currentTruthDare.content}</div>
                    <button
                      onClick={() => setCurrentTruthDare(null)}
                      className="mt-4 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-full transition-all duration-200"
                    >
                      Terminé !
                    </button>
                  </div>
                ) : (
                  <div className="space-x-4">
                    <button
                      onClick={() => getTruthDare('truth')}
                      className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-full shadow-lg transition-all duration-200 hover:scale-105"
                    >
                      Vérité 🤔
                    </button>
                    <button
                      onClick={() => getTruthDare('dare')}
                      className="px-8 py-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 rounded-full shadow-lg transition-all duration-200 hover:scale-105"
                    >
                      Action 😈
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Photos */}
        {activeTab === 'photos' && (
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-8 flex items-center justify-center space-x-3">
              <Camera className="w-8 h-8" />
              <span>Nos Souvenirs</span>
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                { emoji: "🌅", title: "Premier lever de soleil", desc: "Notre voyage romantique" },
                { emoji: "🍦", title: "Premier rendez-vous", desc: "Glace à la fraise" },
                { emoji: "🏠", title: "Notre chez-nous", desc: "Emménagement" },
                { emoji: "🎂", title: "Anniversaire", desc: "Moments de bonheur" },
                { emoji: "💕", title: "Selfie couple", desc: "Tout simplement nous" },
                { emoji: "🌹", title: "Saint-Valentin", desc: "Fête des amoureux" },
                { emoji: "✈️", title: "Voyage", desc: "Aventures ensemble" },
                { emoji: "🎭", title: "Soirée spectacle", desc: "Culture et rires" }
              ].map((photo, idx) => (
                <div
                  key={idx}
                  className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                  onClick={() => addFloatingMessage(`J'adore ce souvenir ! ${photo.emoji}`)}
                >
                  <div className="h-32 bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-4xl">
                    {photo.emoji}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold mb-1">{photo.title}</h3>
                    <p className="text-sm text-purple-200">{photo.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quiz */}
        {activeTab === 'quiz' && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-8 flex items-center justify-center space-x-3">
              <Target className="w-8 h-8" />
              <span>Quiz Couple</span>
            </h2>
            
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20">
              <div className="text-center mb-6">
                <div className="text-lg font-semibold mb-2">Score: {quizScore}/{QUIZ_QUESTIONS.length}</div>
                <div className="text-sm text-purple-200">Question {currentQuiz + 1}/{QUIZ_QUESTIONS.length}</div>
              </div>
              
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-center">{QUIZ_QUESTIONS[currentQuiz].question}</h3>
                
                <div className="grid grid-cols-1 gap-3">
                  {QUIZ_QUESTIONS[currentQuiz].options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuizAnswer(idx)}
                      disabled={quizAnswered}
                      className={`p-4 rounded-lg transition-all duration-200 ${
                        quizAnswered
                          ? idx === QUIZ_QUESTIONS[currentQuiz].correct
                            ? 'bg-green-500/50 border-green-400'
                            : 'bg-white/10 border-white/20'
                          : 'bg-white/10 hover:bg-white/20 border-white/20 hover:scale-105'
                      } border`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                
                <div className="text-center">
                  <button
                    onClick={nextQuiz}
                    className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full shadow-lg transition-all duration-200 hover:scale-105"
                  >
                    Question Suivante
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Musique */}
        {activeTab === 'music' && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-8 flex items-center justify-center space-x-3">
              <Music2 className="w-8 h-8" />
              <span>Notre Playlist</span>
            </h2>
            
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20">
              <p className="text-center mb-6 text-lg text-purple-200">
                Les chansons qui racontent notre histoire d'amour 🎵
              </p>
              
              <div className="bg-white/20 rounded-xl overflow-hidden shadow-xl">
                <iframe 
                  src="https://open.spotify.com/embed/playlist/37i9dQZF1DX3PIPIT6lEg5?utm_source=generator" 
                  width="100%" 
                  height="380" 
                  allow="encrypted-media"
                  className="rounded-xl"
                />
              </div>
              
              <div className="grid md:grid-cols-3 gap-4 mt-8">
                <div className="bg-white/10 rounded-lg p-4 text-center hover:bg-white/20 transition-all duration-200 cursor-pointer"
                     onClick={() => addFloatingMessage("J'adore cette chanson ! 🎵")}>
                  <div className="text-2xl mb-2">🎵</div>
                  <h4 className="font-bold">Notre Chanson</h4>
                  <p className="text-sm text-purple-200">All of Me - John Legend</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4 text-center hover:bg-white/20 transition-all duration-200 cursor-pointer"
                     onClick={() => addFloatingMessage("Cette mélodie me rappelle toi ! 💕")}>
                  <div className="text-2xl mb-2">💕</div>
                  <h4 className="font-bold">Première Danse</h4>
                  <p className="text-sm text-purple-200">Perfect - Ed Sheeran</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4 text-center hover:bg-white/20 transition-all duration-200 cursor-pointer"
                     onClick={() => addFloatingMessage("On danse sur cette chanson ? 💃")}>
                  <div className="text-2xl mb-2">💃</div>
                  <h4 className="font-bold">Notre Mood</h4>
                  <p className="text-sm text-purple-200">Thinking Out Loud</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="text-center py-8 bg-black/20 backdrop-blur-md">
        <p className="text-lg">
          Créé avec <Heart className="w-5 h-5 inline text-red-400 animate-pulse" /> pour Djenabou
        </p>
        <p className="text-purple-200 mt-2">Rafiou & Djenabou - {COUPLE.hashtag}</p>
      </footer>
    </div>
  );
}