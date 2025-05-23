
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from '@/context/AuthContext';
import { Button } from "@/components/ui/button";
import { Settings, RefreshCw, Maximize2 } from 'lucide-react';
import { shouldGameBetWin } from '@/lib/firebase';

// Multiplier values
const multiplierOptions = [
  { value: '1.69x', color: 'bg-red-600' },
  { value: '1.10x', color: 'bg-red-600' },
  { value: '1.02x', color: 'bg-red-600' },
  { value: '1.29x', color: 'bg-red-600' },
  { value: '1.24x', color: 'bg-red-600' },
];

const GoldenBasinGame = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, updateUserBalance } = useAuth();
  
  // Game state
  const [betAmount, setBetAmount] = useState(1);
  const [spinning, setSpinning] = useState(false);
  const [winAmount, setWinAmount] = useState(0);
  const [selectedMultiplier, setSelectedMultiplier] = useState('1.10x');
  const [gameMode, setGameMode] = useState<'Manual' | 'Auto'>('Manual');
  const [gameResult, setGameResult] = useState<'WIN' | 'LOSS' | null>(null);
  const [betCounter, setBetCounter] = useState(0); // Counter to track bets for the betting system
  const spinTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const spinSound = useRef<HTMLAudioElement | null>(null);
  const winSound = useRef<HTMLAudioElement | null>(null);
  
  // Initialize sounds
  useEffect(() => {
    spinSound.current = new Audio('/sounds/spin.mp3');
    winSound.current = new Audio('/sounds/win.mp3');
    
    // Clean up
    return () => {
      if (spinTimeoutRef.current) clearTimeout(spinTimeoutRef.current);
    };
  }, []);
  
  // Handle spin
  const handleSpin = async () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to play",
        variant: "destructive"
      });
      return;
    }
    
    if (user.balance < betAmount) {
      toast({
        title: "Insufficient Balance",
        description: "Please deposit more funds to play",
        variant: "destructive"
      });
      return;
    }
    
    // Clear previous result
    setGameResult(null);
    
    // Update user balance
    updateUserBalance(user.balance - betAmount);
    
    // Play spin sound
    if (spinSound.current) {
      spinSound.current.currentTime = 0;
      spinSound.current.play().catch(error => console.error("Error playing sound:", error));
    }
    
    setSpinning(true);
    setWinAmount(0);
    
    // Calculate win after a delay
    if (spinTimeoutRef.current) clearTimeout(spinTimeoutRef.current);
    
    // Update bet counter
    const newBetCount = betCounter + 1;
    setBetCounter(newBetCount);
    
    spinTimeoutRef.current = setTimeout(async () => {
      // Use Firebase betting system to determine win/loss
      const shouldWin = await shouldGameBetWin(user.id, 'goldenBasin', betAmount);
      
      if (shouldWin) { // Win condition
        const selectedMultiplierValue = parseFloat(selectedMultiplier.replace('x', ''));
        const winAmount = betAmount * selectedMultiplierValue;
        setWinAmount(Number(winAmount.toFixed(2)));
        setGameResult('WIN');
        
        // Update user balance with winnings
        updateUserBalance(user.balance - betAmount + winAmount);
        
        // Play win sound
        if (winSound.current) {
          winSound.current.currentTime = 0;
          winSound.current.play().catch(error => console.error("Error playing sound:", error));
        }
        
        toast({
          title: "Congratulations!",
          description: `You won ${winAmount.toFixed(2)}!`,
        });
      } else { // Loss condition
        setGameResult('LOSS');
      }
      
      setSpinning(false);
      
      // Auto-spin if in auto mode
      if (gameMode === 'Auto' && user.balance >= betAmount) {
        spinTimeoutRef.current = setTimeout(() => {
          handleSpin();
        }, 1000);
      }
    }, 2000);
  };
  
  // Change bet amount
  const changeBetAmount = (factor: number) => {
    let newBet = betAmount;
    
    if (factor === 0.5) {
      newBet = Math.max(0.5, betAmount * 0.5);
    } else if (factor === 2) {
      newBet = betAmount * 2;
    }
    
    setBetAmount(Number(newBet.toFixed(1)));
  };
  
  // Handle mode change
  const toggleMode = () => {
    if (gameMode === 'Auto') {
      setGameMode('Manual');
      if (spinTimeoutRef.current) {
        clearTimeout(spinTimeoutRef.current);
      }
    } else {
      setGameMode('Auto');
    }
  };

  // Stop auto play
  const stopAutoPlay = () => {
    setGameMode('Manual');
    if (spinTimeoutRef.current) {
      clearTimeout(spinTimeoutRef.current);
    }
  };
  
  // Get bet history
  const getBetHistory = () => {
    // Generate artificial history based on betting system
    const history = [];
    const currentCount = betCounter;
    
    // Show last 6 results
    for (let i = 0; i < 6; i++) {
      const betNumber = currentCount - i;
      if (betNumber > 0) {
        // For simplicity, use a simplified pattern here
        // In production, this would be pulled from actual bet history
        const wasWin = betNumber % 5 === 0 || betNumber === 1;
        history.push(wasWin ? 'WIN' : 'LOSS');
      } else {
        // For bets not yet made
        history.push('');
      }
    }
    
    return history;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-800 to-red-950 text-white flex flex-col">
      {/* Game header */}
      <div className="bg-red-900 p-2 flex justify-between items-center">
        {/* Multiplier options */}
        <div className="flex space-x-1">
          {multiplierOptions.map((option, index) => (
            <button 
              key={`mult-${index}`}
              className={`${option.color} px-2 py-1 rounded text-xs ${selectedMultiplier === option.value ? 'border border-yellow-400' : ''}`}
              onClick={() => setSelectedMultiplier(option.value)}
            >
              {option.value}
            </button>
          ))}
        </div>
        
        <div className="flex items-center space-x-2 text-xs text-gray-300">
          <span>61 FPS</span>
          <span>46 ms</span>
        </div>
        
        <button className="text-yellow-500">
          <Settings className="h-6 w-6" />
        </button>
      </div>

      {/* Game container */}
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        {/* Game content */}
        <div className="w-full max-w-md">
          {/* Golden Basin image */}
          <div className="relative rounded-lg overflow-hidden border-4 border-green-700">
            <div className="w-full h-64 bg-amber-700 relative">
              <img 
                src="/lovable-uploads/43827a0e-ee9e-4d09-bbe4-cca5b3d5ce4e.png" 
                alt="Golden Basin" 
                className="w-full h-full object-cover"
              />
              
              {spinning && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <RefreshCw className="h-16 w-16 text-yellow-400 animate-spin" />
                </div>
              )}
              
              {/* Game result text overlay */}
              {gameResult && !spinning && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`text-4xl font-bold ${gameResult === 'WIN' ? 'text-green-500' : 'text-red-500'} 
                                   bg-black/50 px-8 py-4 rounded-lg animate-bounce`}>
                    {gameResult}
                  </div>
                </div>
              )}
            </div>
            
            {/* Mode selector */}
            <div className="bg-gradient-to-r from-green-800 to-teal-800 grid grid-cols-2 gap-0">
              <button 
                className={`py-3 text-center ${gameMode === 'Manual' ? 'bg-green-600' : ''}`}
                onClick={() => setGameMode('Manual')}
              >
                Manual
              </button>
              <button 
                className={`py-3 text-center ${gameMode === 'Auto' ? 'bg-green-600' : ''}`}
                onClick={() => setGameMode('Auto')}
              >
                Auto
              </button>
            </div>
          </div>
          
          {/* Bet settings */}
          <div className="mt-4 bg-green-900 rounded-lg p-3">
            <div className="text-center text-sm mb-2">Bet Setting</div>
            
            <div className="flex justify-between items-center">
              <div className="w-1/3 bg-teal-800 p-3 rounded-lg text-center font-bold">
                {betAmount}
              </div>
              
              <div className="flex space-x-2 w-1/3">
                <button 
                  className="w-full bg-blue-600 rounded py-2 text-sm"
                  onClick={() => changeBetAmount(0.5)}
                >
                  x1/2
                </button>
                
                <button 
                  className="w-full bg-blue-600 rounded py-2 text-sm"
                  onClick={() => changeBetAmount(2)}
                >
                  x2
                </button>
              </div>
              
              <Button
                onClick={handleSpin}
                disabled={spinning || !user}
                className="w-1/3 bg-green-600 hover:bg-green-500 text-white font-bold"
              >
                BET
              </Button>
            </div>
          </div>
          
          {/* Bet history */}
          <div className="mt-4 bg-green-900 rounded-lg p-3">
            <div className="text-center text-sm mb-2">Bet History</div>
            
            <div className="grid grid-cols-3 gap-2">
              {getBetHistory().map((result, index) => (
                <div 
                  key={index} 
                  className={`h-8 rounded-full ${
                    result === 'WIN' ? 'bg-green-600' : 
                    result === 'LOSS' ? 'bg-red-600' : 
                    'bg-gray-600'
                  } flex items-center justify-center text-xs font-bold`}
                >
                  {result || '-'}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Fullscreen button */}
      <div className="fixed bottom-4 right-4">
        <Button className="rounded-full h-12 w-12 bg-green-700 hover:bg-green-600">
          <Maximize2 className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default GoldenBasinGame;
