import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Settings, ArrowBigLeft, ArrowBigRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { shouldMegaSpinWin } from '@/utils/megaSpinBetting';
import { MEGA_SPIN_SEGMENTS } from '@/utils/gameLogic';

const totalSegments = MEGA_SPIN_SEGMENTS.length;
const segmentAngle = 360 / totalSegments;

const MegaSpin = () => {
  const navigate = useNavigate();
  const { user, updateUserBalance } = useAuth();
  const { toast } = useToast();

  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [betAmount, setBetAmount] = useState(5);
  const [winAmount, setWinAmount] = useState(0);
  const [balance, setBalance] = useState(0);
  const [betCount, setBetCount] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);

  const wheelRef = useRef<HTMLDivElement>(null);
  const spinSound = useRef<HTMLAudioElement | null>(null);
  const winSound = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    spinSound.current = new Audio('/sounds/spin.mp3');
    winSound.current = new Audio('/sounds/win.mp3');
    
    if (user) {
      setBalance(user.balance);
    }
  }, [user]);
  
  useEffect(() => {
    if (user) {
      setBalance(user.balance);
    }
  }, [user?.balance]);

  const handleBetChange = (amount: number) => {
    if (isSpinning) return;
    const newBetAmount = Math.max(1, Math.min(100, betAmount + amount));
    setBetAmount(newBetAmount);
  };

  const handleSpin = () => {
    if (isSpinning) return;
    
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to play",
        variant: "destructive"
      });
      return;
    }
    
    if (balance < betAmount) {
      toast({
        title: "Insufficient Funds",
        description: "Please deposit more to play",
        variant: "destructive"
      });
      return;
    }

    setBetCount(prev => prev + 1);
    
    const newBalance = balance - betAmount;
    setBalance(newBalance);
    if (user) {
      updateUserBalance(newBalance);
    }
    
    if (spinSound.current) {
      spinSound.current.currentTime = 0;
      spinSound.current.play().catch(err => console.error("Error playing sound:", err));
    }
    
    const shouldWinThisBet = shouldMegaSpinWin(user?.id || 'anonymous', betAmount);
    
    let targetSegment;
    
    if (shouldWinThisBet) {
      const winningSegments = MEGA_SPIN_SEGMENTS.filter(s => s.value > 0);
      const winningSegmentIndex = Math.floor(Math.random() * winningSegments.length);
      targetSegment = winningSegments[winningSegmentIndex];
    } else {
      const losingSegments = MEGA_SPIN_SEGMENTS.filter(s => s.value === 0);
      const losingSegmentIndex = Math.floor(Math.random() * losingSegments.length);
      targetSegment = losingSegments[losingSegmentIndex];
    }
    
    const targetIndex = MEGA_SPIN_SEGMENTS.findIndex(s => s.id === targetSegment.id);
    
    const extraSpins = 4;
    const baseAngle = 360 * extraSpins;
    
    const segmentOffset = targetIndex * segmentAngle;
    const pointerOffset = 270;
    
    const finalRotation = baseAngle + segmentOffset + (segmentAngle / 2) + pointerOffset;
    
    setIsSpinning(true);
    setWinAmount(0);
    
    setAnimationKey(prev => prev + 1);
    
    setRotation(finalRotation);
    
    setTimeout(() => {
      handleResult(targetSegment);
    }, 5000);
  };

  const handleResult = (segment: typeof MEGA_SPIN_SEGMENTS[0]) => {
    setIsSpinning(false);
    
    const rawWinAmount = betAmount * segment.value;
    const cappedWinAmount = Math.min(100, rawWinAmount);
    
    if (segment.value > 0) {
      if (winSound.current) {
        winSound.current.currentTime = 0;
        winSound.current.play().catch(err => console.error("Error playing sound:", err));
      }
      
      const newBalance = balance + cappedWinAmount;
      setBalance(newBalance);
      if (user) {
        updateUserBalance(newBalance);
      }
      
      setWinAmount(cappedWinAmount);
      
      toast({
        title: "You Won!",
        description: `৳${cappedWinAmount.toFixed(2)} (${segment.text})`,
        variant: "default",
        className: "bg-green-500 text-white"
      });
    } else {
      setWinAmount(0);
      toast({
        title: "Better luck next time!",
        description: `You landed on ${segment.text}`,
        variant: "destructive",
        className: "bg-red-500 text-white"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-indigo-900 text-white">
      <div className="bg-purple-800 p-3 flex justify-between items-center">
        <button onClick={() => navigate('/')} className="text-white">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold">Mega Spin</h1>
        <button className="text-white">
          <Settings size={24} />
        </button>
      </div>
      
      <div className="max-w-md mx-auto p-4 flex flex-col h-[calc(100vh-80px)]">
        <div className="bg-purple-800 rounded-lg p-3 mb-6 flex justify-between">
          <div>
            <div className="text-xs text-purple-300">BALANCE</div>
            <div className="text-xl font-bold">৳{balance.toFixed(2)}</div>
          </div>
          <div>
            <div className="text-xs text-purple-300">BET</div>
            <div className="text-xl font-bold">৳{betAmount.toFixed(2)}</div>
          </div>
          <div>
            <div className="text-xs text-purple-300">WIN</div>
            <div className="text-xl font-bold">৳{winAmount.toFixed(2)}</div>
          </div>
        </div>
        
        <div className="flex-1 relative flex items-center justify-center mb-6">
          <div className="relative w-full max-w-md aspect-square">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="w-0 h-0 border-l-[20px] border-r-[20px] border-t-[40px] border-l-transparent border-r-transparent border-t-yellow-500"></div>
            </div>
            
            <motion.div 
              key={animationKey}
              ref={wheelRef}
              className="w-full h-full rounded-full relative overflow-hidden border-8 border-yellow-500"
              style={{
                transformOrigin: "center center",
                boxShadow: "0 0 30px rgba(255, 215, 0, 0.6)"
              }}
              animate={{ rotate: rotation }}
              initial={{ rotate: 0 }}
              transition={{ duration: 5, ease: "easeOut" }}
            >
              {MEGA_SPIN_SEGMENTS.map((segment, index) => {
                const startAngle = index * segmentAngle;
                const endAngle = (index + 1) * segmentAngle;
                
                return (
                  <div
                    key={segment.id}
                    className="absolute top-0 left-0 w-full h-full"
                    style={{
                      clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos(startAngle * Math.PI / 180)}% ${50 + 50 * Math.sin(startAngle * Math.PI / 180)}%, ${50 + 50 * Math.cos(endAngle * Math.PI / 180)}% ${50 + 50 * Math.sin(endAngle * Math.PI / 180)}%)`,
                      backgroundColor: segment.color,
                    }}
                  >
                    <div 
                      className="absolute whitespace-nowrap font-bold"
                      style={{
                        top: '35%',
                        left: '50%',
                        transform: `translate(-50%, -50%) rotate(${startAngle + segmentAngle / 2}deg) translateY(-70px)`,
                      }}
                    >
                      <div 
                        className="bg-black/30 px-3 py-1 rounded-full border border-white/30"
                        style={{
                          color: segment.textColor,
                          textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                          fontSize: '1.4rem',
                          fontWeight: 'bold',
                        }}
                      >
                        {segment.text}
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
        
        <div className="bg-purple-800 rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <button 
              className="bg-purple-700 text-white p-2 rounded-lg"
              onClick={() => handleBetChange(-5)}
              disabled={isSpinning || betAmount <= 5}
            >
              <ArrowBigLeft size={24} />
            </button>
            
            <div className="text-center">
              <div className="text-sm text-purple-300">BET AMOUNT</div>
              <div className="text-2xl font-bold">{betAmount}</div>
              
              <div className="grid grid-cols-4 gap-2 mt-2">
                <button 
                  className={`py-1 px-2 rounded ${betAmount === 5 ? 'bg-yellow-500 text-purple-900' : 'bg-purple-700'}`}
                  onClick={() => !isSpinning && setBetAmount(5)}
                >
                  5
                </button>
                <button 
                  className={`py-1 px-2 rounded ${betAmount === 10 ? 'bg-yellow-500 text-purple-900' : 'bg-purple-700'}`}
                  onClick={() => !isSpinning && setBetAmount(10)}
                >
                  10
                </button>
                <button 
                  className={`py-1 px-2 rounded ${betAmount === 25 ? 'bg-yellow-500 text-purple-900' : 'bg-purple-700'}`}
                  onClick={() => !isSpinning && setBetAmount(25)}
                >
                  25
                </button>
                <button 
                  className={`py-1 px-2 rounded ${betAmount === 100 ? 'bg-yellow-500 text-purple-900' : 'bg-purple-700'}`}
                  onClick={() => !isSpinning && setBetAmount(100)}
                >
                  100
                </button>
              </div>
            </div>
            
            <button 
              className="bg-purple-700 text-white p-2 rounded-lg"
              onClick={() => handleBetChange(5)}
              disabled={isSpinning || betAmount >= 100}
            >
              <ArrowBigRight size={24} />
            </button>
          </div>
          
          <button
            className={`
              w-full py-4 rounded-lg font-bold text-xl
              ${isSpinning 
                ? 'bg-gray-600 cursor-not-allowed' 
                : 'bg-gradient-to-r from-yellow-400 to-amber-600 hover:from-yellow-300 hover:to-amber-500 text-purple-900'}
            `}
            onClick={handleSpin}
            disabled={isSpinning || !user || (user && user.balance < betAmount)}
          >
            {isSpinning ? 'SPINNING...' : 'SPIN'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MegaSpin;
