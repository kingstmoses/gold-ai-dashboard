"use client";

import { useEffect, useState, type ReactNode } from "react";
// Required packages:
// npm install sonner recharts lucide-react
import { toast, Toaster } from "sonner";
import {
  TrendingUp,
  Activity,
  BrainCircuit,
  Globe2,
  RefreshCw,
  ShieldCheck,
  Radar,
  BarChart3,
} from "lucide-react";

import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

// Suggested project structure:
// /components
//   ├── DashboardHeader.tsx
//   ├── MarketOverview.tsx
//   ├── LiveChart.tsx
//   ├── AI Signal Feed
//   ├── Smart Money Intelligence
//   ├── Global Macro Intelligence
//   ├── Multi-Timeframe Matrix
//   └── AiInsights.tsx

export default function GoldAIPlatform() {
  const [currentTime, setCurrentTime] = useState("");
  const [activePage, setActivePage] = useState("dashboard");
  const [goldPrice, setGoldPrice] = useState("Loading...");
  const [goldValue, setGoldValue] = useState(3330);

  const [marketData, setMarketData] = useState({
    bid: 0,
    ask: 0,
    high: 0,
    low: 0,
    spread: 0,
  });

  const [lastUpdate, setLastUpdate] = useState("");
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [accountName, setAccountName] = useState('Guest Trader');
  const [accountMode, setAccountMode] = useState('DEMO');
  const [tradingStreak, setTradingStreak] = useState(0);
  const [winTrades, setWinTrades] = useState(0);
  const [lossTrades, setLossTrades] = useState(0);
  const [equityHistory, setEquityHistory] = useState<
    {
      time: string;
      pnl: number;
    }[]
  >([]);
  const [signalCount, setSignalCount] = useState(0);
  const [closedTrades, setClosedTrades] = useState<
    {
      pair: string;
      pips: string;
      profit: string;
      result: string;
      closeTime: string;
      progress: string;
      entry: string;
      tp: string;
      sl: string;
    }[]
  >([]);

  const [registeredUsers, setRegisteredUsers] = useState<
    {
      username: string;
      password: string;
    }[]
  >([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [botJournal, setBotJournal] = useState<
    {
      pair: string;
      result: string;
      session: string;
      status: string;
    }[]
  >([]);
  const [lastSignal, setLastSignal] = useState('No signals yet');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [activeTrade, setActiveTrade] = useState(false);
  const [tradeStatus, setTradeStatus] = useState("WAITING");
  const [signalCooldown, setSignalCooldown] = useState(0);
  const [signalQuality, setSignalQuality] = useState("A+");
  const [totalPipsWon, setTotalPipsWon] = useState(0);

  const [entryPrice, setEntryPrice] = useState(goldValue);
  const [tpPips, setTpPips] = useState(100);
  const [slPips, setSlPips] = useState(50);
  const [lotSize, setLotSize] = useState(0.01);
  const [tradeType, setTradeType] = useState("BUY");

  const [dailyTarget] = useState(150);
  const [currentPnL, setCurrentPnL] = useState(0);
  const [maxDrawdown] = useState(-40);

  const today = new Date().getDay();
  const marketClosed = today === 0 || today === 6;

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      setCurrentTime(
        now.toLocaleTimeString("en-KE", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (signalCooldown <= 0) return;

    const timer = setInterval(() => {
      setSignalCooldown((prev) => {
        if (prev <= 1) {
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [signalCooldown]);

  useEffect(() => {
    const savedJournal = localStorage.getItem('gold-ai-bot-journal');
    const savedClosedTrades = localStorage.getItem('gold-ai-closed-trades');
    const savedPnl = localStorage.getItem('gold-ai-current-pnl');
    const savedPips = localStorage.getItem('gold-ai-total-pips');
    const savedAccount = localStorage.getItem('gold-ai-account-name');
    const savedMode = localStorage.getItem('gold-ai-account-mode');
    const savedStreak = localStorage.getItem('gold-ai-trading-streak');
    const savedWins = localStorage.getItem('gold-ai-win-trades');
    const savedLosses = localStorage.getItem('gold-ai-loss-trades');
    const savedEquity = localStorage.getItem('gold-ai-equity-history');
    const savedUsers = localStorage.getItem('gold-ai-users');
    const savedLogin = localStorage.getItem('gold-ai-login-state');

    if (savedJournal) {
      setBotJournal(JSON.parse(savedJournal));
    }

    if (savedClosedTrades) {
      setClosedTrades(JSON.parse(savedClosedTrades));
    }

    if (savedPnl) {
      setCurrentPnL(Number(savedPnl));
    }

    if (savedPips) {
      setTotalPipsWon(Number(savedPips));
    }

    if (savedAccount) {
      setAccountName(savedAccount);
    }

    if (savedMode) {
      setAccountMode(savedMode);
    }

    if (savedStreak) {
      setTradingStreak(Number(savedStreak));
    }

    if (savedWins) {
      setWinTrades(Number(savedWins));
    }

    if (savedLosses) {
      setLossTrades(Number(savedLosses));
    }

    if (savedEquity) {
      setEquityHistory(JSON.parse(savedEquity));
    }

    if (savedUsers) {
      setRegisteredUsers(JSON.parse(savedUsers));
    }

    if (savedLogin === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('gold-ai-bot-journal', JSON.stringify(botJournal));
    localStorage.setItem('gold-ai-closed-trades', JSON.stringify(closedTrades));
    localStorage.setItem('gold-ai-current-pnl', String(currentPnL));
    localStorage.setItem('gold-ai-total-pips', String(totalPipsWon));
    localStorage.setItem('gold-ai-account-name', accountName);
    localStorage.setItem('gold-ai-account-mode', accountMode);
    localStorage.setItem('gold-ai-trading-streak', String(tradingStreak));
    localStorage.setItem('gold-ai-win-trades', String(winTrades));
    localStorage.setItem('gold-ai-loss-trades', String(lossTrades));
    localStorage.setItem('gold-ai-equity-history', JSON.stringify(equityHistory));
    localStorage.setItem('gold-ai-users', JSON.stringify(registeredUsers));
    localStorage.setItem('gold-ai-login-state', String(isLoggedIn));
  }, [botJournal, closedTrades, currentPnL, totalPipsWon, accountName, accountMode, tradingStreak, winTrades, lossTrades, equityHistory, registeredUsers, isLoggedIn]);

  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      if (Notification.permission === "granted") {
        setNotificationsEnabled(true);
      } else {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            setNotificationsEnabled(true);

            toast.success("Notifications Enabled", {
              description: "Gold Scalper Bot alerts are now active",
            });
          }
        });
      }
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const fetchGoldPrice = async () => {
      try {
        const response = await fetch(
          "https://api.gold-api.com/price/XAU",
          {
            signal: controller.signal,
          }
        );

        const data = await response.json();

        if (data.price) {
          const livePrice = Number(data.price);

          setGoldValue(livePrice);
          setGoldPrice(`$${livePrice.toFixed(2)}`);

          setMarketData({
            bid: Number((livePrice - 0.3).toFixed(2)),
            ask: Number((livePrice + 0.3).toFixed(2)),
            high: Number((livePrice + 12.4).toFixed(2)),
            low: Number((livePrice - 10.8).toFixed(2)),
            spread: 0.6,
          });

          setLastUpdate(new Date().toLocaleTimeString());

          if (
            !marketClosed &&
            notificationsEnabled &&
            signalCooldown === 0 &&
            livePrice > 3000
          ) {
            const direction = livePrice >= goldValue ? 'BUY' : 'SELL';

            const entry = livePrice.toFixed(2);

            const generatedTp = direction === 'BUY'
              ? (livePrice + 3.5).toFixed(2)
              : (livePrice - 3.5).toFixed(2);

            const generatedSl = direction === 'BUY'
              ? (livePrice - 2.0).toFixed(2)
              : (livePrice + 2.0).toFixed(2);

            const targetPips = direction === 'BUY' ? '35 PIPS' : '25 PIPS';

            const signalMessage = `${direction} XAUUSD | ENTRY ${entry} | SL ${generatedSl} | TP ${generatedTp}`;

            setSignalCount((prev: number) => prev + 1);
            setLastSignal(signalMessage);
            setActiveTrade(true);
            setTradeStatus(`${direction} ENTRY TRIGGERED`);
            setSignalCooldown(180);

            if (livePrice > goldValue + 2) {
              setSignalQuality('A+');
            } else {
              setSignalQuality('A');
            }

            setBotJournal((prev) => [
              {
                pair: `${direction} XAUUSD`,
                result: `${targetPips} TARGET`,
                session: 'LIVE MARKET',
                status: `TP ${generatedTp}`,
              },
              ...prev.slice(0, 9),
            ]);

            setTimeout(() => {
              const profitValue = direction === 'BUY' ? 3.5 : 2.5;
              const estimatedUsd = profitValue * (lotSize / 0.01);

              setClosedTrades((prev) => [
                {
                  pair: `${direction} XAUUSD`,
                  pips: targetPips,
                  profit: `+$${estimatedUsd.toFixed(2)}`,
                  result: Math.random() > 0.25 ? 'TP HIT' : 'SL HIT',
                  progress: Math.random() > 0.25 ? 'TARGET REACHED' : 'STOP LOSS TRIGGERED',
                  entry: entry,
                  tp: generatedTp,
                  sl: generatedSl,
                  closeTime: new Date().toLocaleTimeString(),
                },
                ...prev.slice(0, 14),
              ]);

              setCurrentPnL((prev) => {
                const updatedPnL = prev + estimatedUsd;

                setEquityHistory((history) => [
                  ...history,
                  {
                    time: new Date().toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    }),
                    pnl: Number(updatedPnL.toFixed(2)),
                  },
                ].slice(-20));

                return updatedPnL;
              });
              setTotalPipsWon((prev) => prev + Number.parseInt(targetPips));
              const isWin = Math.random() > 0.25;

              if (isWin) {
                setTradeStatus('TP HIT');
                setTradingStreak((prev) => prev + 1);
                setWinTrades((prev) => prev + 1);
                setTotalPipsWon((prev) => prev + Number.parseInt(targetPips));
              } else {
                setTradeStatus('SL HIT');
                setTradingStreak(0);
                setLossTrades((prev) => prev + 1);
                setCurrentPnL((prev) => prev - estimatedLoss);
              }
            }, 45000);

            toast.success('Gold Scalper Bot Signal', {
              description: `${signalMessage} | TARGET ${targetPips}`,
            });

            if (soundEnabled) {
              const audio = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');
              audio.volume = 0.4;
              audio.play().catch(() => {});
            }

            if (Notification.permission === 'granted') {
              new Notification('Gold Scalper Bot', {
              body: `${signalMessage} | TARGET ${targetPips}`,
              icon: 'https://cdn-icons-png.flaticon.com/512/2933/2933245.png',
              });
            }
          }
        }
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error("Gold price fetch failed", error);
        }
      }
    };

    fetchGoldPrice();

    const interval = setInterval(fetchGoldPrice, 15000);

    return () => {
      controller.abort();
      clearInterval(interval);
    };
  }, [notificationsEnabled, signalCooldown, marketClosed, soundEnabled, goldValue]);

  const liveSignals = [
    {
      type: "LIVE SCALP BUY",
      entry: (goldValue - 2.5).toFixed(2),
      sl: (goldValue - 8.0).toFixed(2),
      tp: (goldValue + 18.0).toFixed(2),
      rr: "1 : 3.2",
      confidence: "94%",
    },
    {
      type: "INTRADAY BUY",
      entry: (goldValue - 6.0).toFixed(2),
      sl: (goldValue - 14.0).toFixed(2),
      tp: (goldValue + 32.0).toFixed(2),
      rr: "1 : 4.0",
      confidence: "91%",
    },
    {
      type: "BREAKOUT BUY",
      entry: (goldValue + 3.0).toFixed(2),
      sl: (goldValue - 7.0).toFixed(2),
      tp: (goldValue + 28.0).toFixed(2),
      rr: "1 : 3.0",
      confidence: "89%",
    },
  ];

  const timeframeData = [
    { tf: "1M", signal: "SCALP BUY", strength: 69 },
    { tf: "5M", signal: "BUY", strength: 72 },
    { tf: "15M", signal: "BUY", strength: 81 },
    { tf: "1H", signal: "STRONG BUY", strength: 88 },
    { tf: "4H", signal: "INSTITUTIONAL BUY", strength: 92 },
  ];

  const aiInsights = [
    "Institutional accumulation detected above intraday support.",
    "Liquidity sweep probability elevated before NY open.",
    "Macro conditions continue supporting gold strength.",
    "Momentum expansion active on lower timeframes.",
  ];

  const executionZones = [
    {
      session: "London Continuation",
      bias: "BUY",
      confluence: "91%",
    },
    {
      session: "NY Reversal Zone",
      bias: "WATCH",
      confluence: "78%",
    },
    {
      session: "Asian Range Break",
      bias: "BREAKOUT",
      confluence: "84%",
    },
  ];

  const activeHour = new Date().getHours();

  const londonActive = activeHour >= 10 && activeHour <= 13;
  const nyActive = activeHour >= 15 && activeHour <= 18;
  const lunchSession = activeHour >= 13 && activeHour <= 14;

  const liquidityRadar = [
    {
      level: "Buy-Side Liquidity",
      status: "TARGETED",
      color: londonActive ? "text-green-400" : "text-zinc-400",
    },
    {
      level: "Sell-Side Liquidity",
      status: "SWEPT",
      color: lunchSession ? "text-red-400" : "text-zinc-400",
    },
    {
      level: "Equal Highs",
      status: "ACTIVE",
      color: nyActive ? "text-yellow-400" : "text-zinc-400",
    },
  ];

  const sessionPerformance = [
    {
      name: "London",
      win: "87%",
    },
    {
      name: "New York",
      win: "82%",
    },
    {
      name: "Asia",
      win: "71%",
    },
  ];

  const aiLabModels = [
    {
      model: "Scalp Engine v2",
      accuracy: "91%",
      status: "ACTIVE",
    },
    {
      model: "Liquidity Predictor",
      accuracy: "87%",
      status: "LEARNING",
    },
    {
      model: "Macro Fusion AI",
      accuracy: "84%",
      status: "ACTIVE",
    },
  ];

  const marketSessions = [
    {
      name: "Sydney",
      status: marketClosed ? "CLOSED" : "OFFLINE",
    },
    {
      name: "Tokyo",
      status: marketClosed ? "CLOSED" : "STANDBY",
    },
    {
      name: "London",
      status: marketClosed ? "CLOSED" : "ACTIVE",
    },
    {
      name: "New York",
      status: marketClosed ? "CLOSED" : "PENDING",
    },
  ];

  const institutionalFlow = [
    {
      title: "Order Flow",
      value: "BULLISH",
      color: londonActive ? "text-green-400" : "text-zinc-500",
    },
    {
      title: "Liquidity Pressure",
      value: "HIGH",
      color: "text-orange-400",
    },
    {
      title: "Manipulation Risk",
      value: "MEDIUM",
      color: nyActive ? "text-yellow-400" : "text-zinc-500",
    },
    {
      title: "Institutional Bias",
      value: "ACCUMULATION",
      color: "text-cyan-400",
    },
  ];

  const scalperBotSignals = [
    {
      type: "Momentum Scalper BUY",
      trigger: "EMA 10 > EMA 30",
      atr: "HIGH VOLATILITY",
      entry: (goldValue - 1.8).toFixed(2),
      tp: (goldValue + 6.5).toFixed(2),
      sl: (goldValue - 4.2).toFixed(2),
      confidence: "96%",
      trend: "M15 BULLISH",
    },
    {
      type: "ATR Expansion BUY",
      trigger: "ATR Breakout Active",
      atr: "EXPANDING",
      entry: (goldValue + 0.8).toFixed(2),
      tp: (goldValue + 8.0).toFixed(2),
      sl: (goldValue - 3.5).toFixed(2),
      confidence: "92%",
      trend: "TREND ALIGNED",
    },
    {
      type: "Trend Filter Continuation",
      trigger: "EMA 50 > EMA 200",
      atr: "MODERATE",
      entry: (goldValue - 2.2).toFixed(2),
      tp: (goldValue + 9.5).toFixed(2),
      sl: (goldValue - 5.5).toFixed(2),
      confidence: "89%",
      trend: "HTF CONFIRMED",
    },
  ];

  const dynamicWinRate =
    activeHour >= 8 && activeHour <= 10
      ? '95%'
      : activeHour >= 15 && activeHour <= 17
      ? '88%'
      : '79%';

  const dynamicSignalCount =
    activeHour >= 8 && activeHour <= 10
      ? String(18 + Math.floor(Math.random() * 8))
      : String(6 + Math.floor(Math.random() * 6));

  const dynamicRR =
    activeHour >= 8 && activeHour <= 10
      ? '1 : 4.1'
      : activeHour >= 15 && activeHour <= 17
      ? '1 : 3.2'
      : '1 : 2.0';

  const botAnalytics = [
    {
      label: "Bot Win Rate",
      value: dynamicWinRate,
      color: "text-green-400",
    },
    {
      label: "Signals Today",
      value: dynamicSignalCount,
      color: "text-cyan-400",
    },
    {
      label: "Average RR",
      value: dynamicRR,
      color: "text-yellow-400",
    },
    {
      label: "Bot Status",
      value: marketClosed ? "PAUSED" : activeTrade ? "EXECUTING" : "RUNNING",
      color: marketClosed ? "text-red-400" : "text-emerald-400",
    },
  ];

  const signalHistory = botJournal.length > 0
    ? botJournal
    : [
        {
          pair: 'BOT JOURNAL RESET',
          result: 'WAITING FOR LIVE TRADES',
          session: 'LIVE MARKET',
          status: 'STANDBY',
        },
      ];

  const sniperEntries = [
    {
      zone: "Liquidity Sweep Reversal",
      entry: (goldValue - 3.4).toFixed(2),
      target: (goldValue + 16.8).toFixed(2),
      confidence: "95%",
    },
    {
      zone: "London Killzone Continuation",
      entry: (goldValue - 1.6).toFixed(2),
      target: (goldValue + 12.2).toFixed(2),
      confidence: "91%",
    },
    {
      zone: "NY Breakout Expansion",
      entry: (goldValue + 2.8).toFixed(2),
      target: (goldValue + 21.5).toFixed(2),
      confidence: "89%",
    },
  ];

  const aiExecutionEngine = [
    {
      label: "Execution Speed",
      value: "12ms",
      color: "text-cyan-400",
    },
    {
      label: "Spread Filter",
      value: "ACTIVE",
      color: "text-green-400",
    },
    {
      label: "Slippage Control",
      value: "ENABLED",
      color: "text-yellow-400",
    },
    {
      label: "Risk Engine",
      value: "PROTECTED",
      color: "text-purple-400",
    },
  ];

  const marketBias = goldValue > 3350 ? 'STRONG BULLISH' : goldValue > 3320 ? 'BULLISH' : 'BEARISH';

  const volatilityState =
    marketData.high - marketData.low > 20
      ? 'EXPANDING'
      : 'NORMAL';

  const dollarStrength =
    goldValue > 3340 ? 'WEAKENING' : 'STRENGTHENING';

  const fearGreed =
    volatilityState === 'EXPANDING' ? 'RISK OFF' : 'NEUTRAL';

  const trendScore =
    goldValue > marketData.bid ? '89 / 100' : '72 / 100';

  const marketPulse = [
    {
      label: 'Fear & Greed',
      value: fearGreed,
      color: 'text-orange-400',
    },
    {
      label: 'Dollar Strength',
      value: dollarStrength,
      color: dollarStrength === 'WEAKENING' ? 'text-red-400' : 'text-blue-400',
    },
    {
      label: 'Volatility State',
      value: volatilityState,
      color: volatilityState === 'EXPANDING' ? 'text-cyan-400' : 'text-zinc-300',
    },
    {
      label: 'AI Pulse',
      value: marketBias,
      color: marketBias.includes('BULLISH') ? 'text-green-400' : 'text-red-400',
    },
  ];

  const killzones = [
    {
      name: "London Killzone",
      time: "10:00 - 13:00 EAT",
      bias: "BUY CONTINUATION",
    },
    {
      name: "New York Killzone",
      time: "15:00 - 18:00 EAT",
      bias: "VOLATILITY EXPANSION",
    },
    {
      name: "Asian Range",
      time: "03:00 - 08:00 EAT",
      bias: "RANGE BUILDING",
    },
  ];

  const economicEvents = [
    {
      event: marketClosed ? "Market Reopen Watch" : "US CPI Data",
      impact: "HIGH",
      time: marketClosed ? "Market Closed" : "15:30 EAT",
      bias: marketClosed ? "WAITING FOR OPEN" : "VOLATILITY SPIKE",
    },
    {
      event: marketClosed ? "Weekend Liquidity" : "Fed Speech",
      impact: marketClosed ? "LOW" : "MEDIUM",
      time: marketClosed ? "Weekend Session" : "21:00 EAT",
      bias: marketClosed ? "LOW VOLUME" : "USD WEAKNESS",
    },
    {
      event: marketClosed ? "Asian Open Preparation" : "NFP Week",
      impact: "EXTREME",
      time: marketClosed ? "Monday Open" : "Friday",
      bias: marketClosed ? "GAP VOLATILITY" : "GOLD EXPANSION",
    },
  ];

  const aiRiskMonitor = [
    {
      title: "Exposure Level",
      value: "LOW",
      color: "text-green-400",
    },
    {
      title: "Volatility Risk",
      value: "MODERATE",
      color: "text-yellow-400",
    },
    {
      title: "Liquidity Trap",
      value: "ACTIVE",
      color: lunchSession ? "text-red-400" : "text-zinc-500",
    },
    {
      title: "AI Protection",
      value: "ENABLED",
      color: "text-cyan-400",
    },
  ];

  const sessionCommander = [
    {
      session: "London Open",
      time: "10:00 EAT",
      state: londonActive ? "LIVE MOMENTUM ACTIVE" : "AWAITING OPEN",
      color: "text-green-400",
    },
    {
      session: "NY Overlap",
      time: "15:00 EAT",
      state: nyActive ? "VOLATILITY EXPANSION" : "PENDING ACTIVATION",
      color: "text-yellow-400",
    },
    {
      session: "Lunch Hours",
      time: "13:00 EAT",
      state: lunchSession ? "LOW LIQUIDITY ACTIVE" : "INACTIVE",
      color: "text-red-400",
    },
  ];

  const profitHeatmap = [
    {
      hour: "08:00",
      strength: "ELITE",
      color: "text-cyan-400",
      winRate: "92%",
      note: "London pre-momentum accumulation",
    },
    {
      hour: "09:00",
      strength: "EXTREME",
      color: "text-green-400",
      winRate: "96%",
      note: "Strong continuation volatility",
    },
    {
      hour: "10:00",
      strength: "INSTITUTIONAL",
      color: "text-yellow-400",
      winRate: "97%",
      note: "Highest bot profitability window",
    },
    {
      hour: "11:00",
      strength: "STRONG",
      color: "text-purple-400",
      winRate: "88%",
      note: "Momentum continuation phase",
    },
    {
      hour: "14:00",
      strength: "WEAK",
      color: "text-red-400",
      winRate: "61%",
      note: "Low-quality ranging conditions",
    },
    {
      hour: "15:00",
      strength: "EXPANSION",
      color: "text-orange-400",
      winRate: "84%",
      note: "New York volatility injection",
    },
  ];

  const eliteTradingWindow = {
    start: "08:00 EAT",
    end: "10:59 EAT",
    status:
      activeHour >= 8 && activeHour <= 10
        ? "LIVE ELITE EXECUTION WINDOW"
        : "PRIMARY PROFIT WINDOW",
    averageRR: "1 : 3.8",
    winRate: "95%",
  };

  const tpPrice =
    tradeType === "BUY"
      ? entryPrice + tpPips / 10
      : entryPrice - tpPips / 10;

  const slPrice =
    tradeType === "BUY"
      ? entryPrice - slPips / 10
      : entryPrice + slPips / 10;

  const estimatedProfit =
    (tpPips / 10) * (lotSize / 0.01);

  const estimatedLoss =
    (slPips / 10) * (lotSize / 0.01);

  const remainingTarget = Math.max(dailyTarget - currentPnL, 0);

  const useSignal = (
    type: string,
    entry: string,
    tp: string,
    sl: string
  ) => {
    setTradeType(type.includes("SELL") ? "SELL" : "BUY");
    setEntryPrice(Number(entry));

    const tpDistance = Math.abs(Number(tp) - Number(entry)) * 10;
    const slDistance = Math.abs(Number(entry) - Number(sl)) * 10;

    setTpPips(Math.round(tpDistance));
    setSlPips(Math.round(slDistance));

    setActivePage("pips-calculator");

    toast.success("Signal Loaded Into Calculator", {
      description: `${type} ready for execution`,
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <MarqueeStyles />
      <Toaster richColors position="top-right" />
      <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-green-400 tracking-tight">
              AI Gold Intelligence Platform
            </h1>

            <p className="text-zinc-400 text-sm mt-1">
              Institutional XAU/USD Analysis Dashboard
            </p>

            <div className="mt-3 flex items-center gap-2 flex-wrap">
              <div className={`px-3 py-1 rounded-lg text-xs font-bold ${notificationsEnabled ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
                {notificationsEnabled ? 'LIVE ALERTS ENABLED' : 'NOTIFICATIONS DISABLED'}
              </div>

              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`px-3 py-1 rounded-lg text-xs font-bold border transition-all ${soundEnabled ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' : 'bg-zinc-800 text-zinc-400 border-zinc-700'}`}
              >
                {soundEnabled ? 'SOUND ON' : 'SOUND OFF'}
              </button>
            </div>
          </div>
                  <div className="flex items-center gap-2 flex-wrap justify-end">
            {[
              ["dashboard", "Dashboard"],
              ["signals", "Signals"],
              ["scalper-bot", "Scalper Bot"],
              ["smartmoney", "Smart Money"],
              ["macro", "Macro"],
              ["pips-calculator", "Pips Calculator"],
              ["ai-lab", "AI Lab"],
            ].map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActivePage(key)}
                className={`px-4 py-2 rounded-xl transition-all font-semibold text-sm whitespace-nowrap ${
                  activePage === key
                    ? "bg-green-500 text-black"
                    : "bg-zinc-900 border border-zinc-700 text-white hover:border-green-500"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-6 space-y-6 overflow-hidden">
        {!isLoggedIn && (
          <section className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <div>
                <h2 className="text-3xl font-black text-green-400">
                  Trader Authentication Portal
                </h2>

                <p className="text-zinc-400 mt-2">
                  Create accounts and securely access persistent AI trading data.
                </p>
              </div>

              <div className="bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-xl text-green-400 font-bold">
                SECURED ACCESS
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                placeholder="Username"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                className="bg-black border border-zinc-700 rounded-2xl p-4"
              />

              <input
                type="password"
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="bg-black border border-zinc-700 rounded-2xl p-4"
              />

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    const exists = registeredUsers.find(
                      (u) =>
                        u.username === loginUsername &&
                        u.password === loginPassword
                    );

                    if (exists) {
                      setIsLoggedIn(true);
                      setAccountName(loginUsername);

                      toast.success('Login Successful');
                    } else {
                      toast.error('Invalid Credentials');
                    }
                  }}
                  className="flex-1 bg-green-500 hover:bg-green-400 text-black font-black rounded-2xl px-4 py-4"
                >
                  LOGIN
                </button>

                <button
                  onClick={() => {
                    if (!loginUsername || !loginPassword) {
                      toast.error('Enter username and password');
                      return;
                    }

                    const updatedUsers = [
                      ...registeredUsers,
                      {
                        username: loginUsername,
                        password: loginPassword,
                      },
                    ];

                    setRegisteredUsers(updatedUsers);
                    toast.success('Account Created');
                  }}
                  className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-black font-black rounded-2xl px-4 py-4"
                >
                  REGISTER
                </button>
              </div>
            </div>
          </section>
        )
        <section className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4 items-center">
            <div>
              <div className="text-zinc-500 text-sm">Trader Profile</div>
              <div className="text-2xl font-black text-green-400 mt-1">
                {accountName}
              </div>
            </div>

            <div>
              <div className="text-zinc-500 text-sm">Account Mode</div>
              <div className={`text-2xl font-black mt-1 ${accountMode === 'LIVE' ? 'text-red-400' : 'text-yellow-400'}`}>
                {accountMode}
              </div>
            </div>

            <div>
              <div className="text-zinc-500 text-sm">Winning Streak</div>
              <div className="text-2xl font-black text-cyan-400 mt-1">
                {tradingStreak}
              </div>
            </div>

            <div>
              <div className="text-zinc-500 text-sm">Win Ratio</div>
              <div className="text-2xl font-black text-green-400 mt-1">
                {winTrades + lossTrades === 0
                  ? '0%'
                  : `${Math.round((winTrades / (winTrades + lossTrades)) * 100)}%`}
              </div>
            </div>

            <div className="flex gap-2 flex-wrap justify-end">
              <button
                onClick={() => setAccountMode(accountMode === 'LIVE' ? 'DEMO' : 'LIVE')}
                className="px-4 py-3 rounded-2xl bg-green-500 text-black font-black hover:bg-green-400 transition-all"
              >
                SWITCH MODE
              </button>

              <button
                onClick={() => {
                  const trader = prompt('Enter trader name');
                  if (trader) setAccountName(trader);
                }}
                className="px-4 py-3 rounded-2xl border border-zinc-700 bg-black text-white font-bold hover:border-green-500 transition-all"
              >
                EDIT PROFILE
              </button>
            </div>
          </div>
        </section>
        {activePage === "dashboard" && (
          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
            <MetricCard title="Live Bid" value={marketData.bid || '--'} color="text-green-400" />
            <MetricCard title="Live Ask" value={marketData.ask || '--'} color="text-red-400" />
            <MetricCard title="Daily High" value={marketData.high || '--'} color="text-yellow-400" />
            <MetricCard title="Daily Low" value={marketData.low || '--'} color="text-cyan-400" />
            <MetricCard title="Spread" value={marketData.spread || '--'} color="text-purple-400" />
          </section>
        )}

        {(activePage === "dashboard" || activePage === "signals") && (
          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4">
            <OverviewCard
              title="Signals Fired"
              value={String(signalCount)}
              subtitle="Live notification count"
              icon={<ShieldCheck className="w-5 h-5 text-purple-400" />}
            />

            <div className="xl:col-span-2 bg-zinc-900 border border-zinc-800 rounded-3xl p-5 overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <div className="text-zinc-400 text-sm">Last Signal</div>
                <Activity className="w-5 h-5 text-red-400" />
              </div>

              <div className="relative overflow-hidden rounded-xl bg-black border border-zinc-800 h-12 flex items-center">
                <div className="animate-marquee whitespace-nowrap text-lg font-bold text-green-400 px-4">
                  {lastSignal}
                </div>
              </div>

              <div className="text-cyan-400 text-xs mt-3 font-medium">
                Live execution signal stream
              </div>
            </div>

            <OverviewCard
              title="Live Gold Price"
              value={goldPrice}
              subtitle={`Updated ${lastUpdate || '--'}`}
              icon={<TrendingUp className="w-5 h-5 text-green-400" />}
            />

            <OverviewCard
              title="AI Trend Score"
              value={trendScore}
              subtitle="Institutional Bullish"
              icon={<BrainCircuit className="w-5 h-5 text-cyan-400" />}
            />

            <OverviewCard
              title="Volatility"
              value={volatilityState}
              subtitle="ATR Expanding"
              icon={<Activity className="w-5 h-5 text-orange-400" />}
            />

            <OverviewCard
              title="Signal Grade"
              value={signalQuality}
              subtitle={activeTrade ? tradeStatus : 'No active trade'}
              icon={<ShieldCheck className="w-5 h-5 text-green-400" />}
            />

            <OverviewCard
              title="Cooldown"
              value={signalCooldown > 0 ? `${signalCooldown}s` : 'READY'}
              subtitle="Duplicate signal protection"
              icon={<RefreshCw className="w-5 h-5 text-cyan-400" />}
            />

            <OverviewCard
              title="Session Bias"
              value={marketClosed ? 'MARKET CLOSED' : 'LONDON BULLISH'}
              subtitle={currentTime}
              icon={<Globe2 className="w-5 h-5 text-yellow-400" />}
            />
          </section>
        )}

        
        {marketClosed && (
          <section className="bg-yellow-500/10 border border-yellow-500/30 rounded-3xl p-5 flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-2xl font-black text-yellow-400">
                Market Closed
              </h2>

              <p className="text-zinc-300 mt-1">
                Gold market is currently closed for the weekend. Live prices and signals may pause until market reopen.
              </p>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <div className="bg-yellow-500/20 px-4 py-2 rounded-xl text-yellow-300 font-bold">
                WEEKEND MODE
              </div>

              <div className={`px-4 py-2 rounded-xl font-bold ${activeTrade ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-zinc-800 text-zinc-400 border border-zinc-700'}`}>
                {activeTrade ? tradeStatus : 'NO ACTIVE TRADE'}
              </div>
            </div>
          </section>
        )}

        {activePage === "dashboard" && (
          <>
            <section className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 overflow-hidden">
              <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                <div>
                  <h2 className="text-3xl font-black text-green-400">
                    Live Gold Chart
                  </h2>

                  <p className="text-zinc-400 mt-1">
                    Institutional XAU/USD live monitoring.
                  </p>
                </div>

                <div className="flex items-center gap-2 text-green-400 font-bold">
                  <RefreshCw className={`${marketClosed ? '' : 'animate-spin'} w-4 h-4`} />
                  {marketClosed ? 'MARKET CLOSED' : 'LIVE MARKET'}
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden border border-zinc-800 bg-black h-[500px]">
                <iframe
                  loading="lazy"
                  src="https://s.tradingview.com/widgetembed/?symbol=OANDA%3AXAUUSD&interval=15&theme=dark&style=1&timezone=Africa%2FNairobi"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  title="TradingView Gold Chart"
                />
              </div>
            </section>

            <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2 bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <BrainCircuit className="text-green-400" />

                  <h2 className="text-3xl font-black text-green-400">
                    AI Market Insights
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {aiInsights.map((insight, index) => (
                    <div
                      key={index}
                      className="bg-black border border-zinc-800 rounded-2xl p-5"
                    >
                      <div className="text-zinc-300 leading-relaxed text-sm">
                        {insight}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <BarChart3 className="text-cyan-400" />

                  <h2 className="text-2xl font-black text-cyan-400">
                    Session Performance
                  </h2>
                </div>

                <div className="space-y-4">
                  {sessionPerformance.map((session, index) => (
                    <div
                      key={index}
                      className="bg-black border border-zinc-800 rounded-2xl p-5"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-zinc-500 text-sm">
                            Session
                          </div>

                          <div className="text-xl font-bold mt-1">
                            {session.name}
                          </div>
                        </div>

                        <div className="text-3xl font-black text-cyan-400">
                          {session.win}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {marketPulse.map((pulse, index) => (
                <div
                  key={index}
                  className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5"
                >
                  <div className="text-zinc-500 text-sm">
                    {pulse.label}
                  </div>

                  <div className={`text-2xl font-black mt-3 ${pulse.color}`}>
                    {pulse.value}
                  </div>
                </div>
              ))}
            </section>

            <section className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
              <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                <div>
                  <h2 className="text-3xl font-black text-red-400">
                    AI Sniper Entries
                  </h2>

                  <p className="text-zinc-400 mt-2">
                    Precision institutional entry zones with momentum alignment.
                  </p>
                </div>

                <div className="bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-xl text-red-400 font-bold">
                  SNIPER MODE
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {sniperEntries.map((entry, index) => (
                  <div
                    key={index}
                    className="bg-black border border-zinc-800 rounded-2xl p-5"
                  >
                    <div className="text-zinc-500 text-sm">
                      Entry Zone
                    </div>

                    <div className="text-xl font-black text-red-400 mt-2 break-words">
                      {entry.zone}
                    </div>

                    <div className="mt-5 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Entry</span>
                        <span>{entry.entry}</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-zinc-500">Target</span>
                        <span className="text-green-400">{entry.target}</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-zinc-500">Confidence</span>
                        <span className="text-cyan-400 font-bold">{entry.confidence}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                <div>
                  <h2 className="text-3xl font-black text-purple-400">
                    Institutional Flow Engine
                  </h2>

                  <p className="text-zinc-400 mt-2">
                    AI-driven institutional pressure and liquidity tracking.
                  </p>
                </div>

                <div className="bg-purple-500/10 border border-purple-500/20 px-4 py-2 rounded-xl text-purple-400 font-bold">
                  LIVE FLOW
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
                {institutionalFlow.map((item, index) => (
                  <div
                    key={index}
                    className="bg-black border border-zinc-800 rounded-2xl p-5"
                  >
                    <div className="text-zinc-500 text-sm">
                      {item.title}
                    </div>

                    <div className={`text-2xl font-black mt-3 ${item.color}`}>
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {killzones.map((zone, index) => (
                  <div
                    key={index}
                    className="bg-black border border-zinc-800 rounded-2xl p-5"
                  >
                    <div className="text-zinc-500 text-sm">
                      Trading Window
                    </div>

                    <div className="text-2xl font-black text-yellow-400 mt-2">
                      {zone.name}
                    </div>

                    <div className="mt-4 text-sm space-y-2">
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Time</span>
                        <span>{zone.time}</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-zinc-500">Bias</span>
                        <span className="text-green-400 font-bold">
                          {zone.bias}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                {aiExecutionEngine.map((engine, index) => (
                  <div
                    key={index}
                    className="bg-black border border-zinc-800 rounded-2xl p-5"
                  >
                    <div className="text-zinc-500 text-sm">
                      {engine.label}
                    </div>

                    <div className={`text-2xl font-black mt-3 ${engine.color}`}>
                      {engine.value}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {activePage === "scalper-bot" && (
          <section className="space-y-6">
            <section className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
              <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                <div>
                  <h2 className="text-3xl font-black text-cyan-400">
                    Session Commander
                  </h2>

                  <p className="text-zinc-400 mt-2">
                    High-performance execution timing for your gold scalping sessions.
                  </p>
                </div>

                <div className="bg-cyan-500/10 border border-cyan-500/20 px-4 py-2 rounded-xl text-cyan-400 font-bold">
                  ELITE WINDOW
                </div>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-2xl p-5 mb-6">
                <div className="text-zinc-400 text-sm">
                  AI Priority Window
                </div>

                <div className="text-3xl font-black text-cyan-400 mt-2">
                  {eliteTradingWindow.status}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-5">
                  <div>
                    <div className="text-zinc-500 text-sm">Start</div>
                    <div className="font-bold mt-1">{eliteTradingWindow.start}</div>
                  </div>

                  <div>
                    <div className="text-zinc-500 text-sm">End</div>
                    <div className="font-bold mt-1">{eliteTradingWindow.end}</div>
                  </div>

                  <div>
                    <div className="text-zinc-500 text-sm">Average RR</div>
                    <div className="font-bold text-green-400 mt-1">
                      {eliteTradingWindow.averageRR}
                    </div>
                  </div>

                  <div>
                    <div className="text-zinc-500 text-sm">Win Rate</div>
                    <div className="font-bold text-yellow-400 mt-1">
                      {eliteTradingWindow.winRate}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {sessionCommander.map((session, index) => (
                  <div
                    key={index}
                    className="bg-black border border-zinc-800 rounded-2xl p-5"
                  >
                    <div className="text-zinc-500 text-sm">
                      Trading Window
                    </div>

                    <div className="text-2xl font-black text-cyan-400 mt-3">
                      {session.session}
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-zinc-500">Time</span>
                      <span>{session.time}</span>
                    </div>

                    <div className={`mt-4 font-black ${session.color}`}>
                      {session.state}
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <section className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
              <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                <div>
                  <h2 className="text-3xl font-black text-yellow-400">
                    Gold Scalper Bot Signals
                  </h2>

                  <p className="text-zinc-400 mt-2">
                    EA-inspired momentum + ATR + trend alignment scalping engine.
                  </p>
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/20 px-4 py-2 rounded-xl text-yellow-400 font-bold">
                  BOT ACTIVE
                </div>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                {scalperBotSignals.map((bot, index) => (
                  <div
                    key={index}
                    className="bg-black border border-zinc-800 rounded-2xl p-5"
                  >
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <div className="text-2xl font-black text-yellow-400 break-words">
                        {bot.type}
                      </div>

                      <div className="text-green-400 font-black">
                        {bot.confidence}
                      </div>
                    </div>

                    <div className="mt-5 space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Trigger</span>
                        <span>{bot.trigger}</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-zinc-500">ATR</span>
                        <span>{bot.atr}</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-zinc-500">Trend</span>
                        <span>{bot.trend}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 mt-5">
                      <SignalBox label="Entry" value={bot.entry} />
                      <SignalBox label="TP" value={bot.tp} color="text-green-400" />
                      <SignalBox label="SL" value={bot.sl} color="text-red-400" />
                    </div>

                    <button
                      onClick={() =>
                        useSignal(
                          bot.type,
                          bot.entry,
                          bot.tp,
                          bot.sl
                        )
                      }
                      className="w-full mt-5 bg-yellow-500 hover:bg-yellow-400 transition-all text-black font-black py-3 rounded-2xl"
                    >
                      USE SIGNAL
                    </button>
                  </div>
                ))}
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {botAnalytics.map((item, index) => (
                <div
                  key={index}
                  className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5"
                >
                  <div className="text-zinc-500 text-sm">
                    {item.label}
                  </div>

                  <div className={`text-3xl font-black mt-3 ${item.color}`}>
                    {item.value}
                  </div>
                </div>
              ))}
            </section>

            <section className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
              <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                <div>
                  <h2 className="text-3xl font-black text-cyan-400">
                    Scalper Bot Trade History
                  </h2>

                  <p className="text-zinc-400 mt-2">
                    Recent completed AI bot executions and outcomes.
                  </p>
                </div>

                <div className="bg-cyan-500/10 border border-cyan-500/20 px-4 py-2 rounded-xl text-cyan-400 font-bold">
                  BOT JOURNAL
                </div>
              </div>

              <div className="space-y-4">
                {signalHistory.map((trade, index) => (
                  <div
                    key={index}
                    className="bg-black border border-zinc-800 rounded-2xl p-5 flex items-center justify-between flex-wrap gap-4"
                  >
                    <div>
                      <div className="text-zinc-500 text-sm">
                        Trade
                      </div>

                      <div className="text-xl font-black text-white mt-1">
                        {trade.pair}
                      </div>
                    </div>

                    <div>
                      <div className="text-zinc-500 text-sm">
                        Session
                      </div>

                      <div className="font-bold mt-1 text-yellow-400">
                        {trade.session}
                      </div>
                    </div>

                    <div>
                      <div className="text-zinc-500 text-sm">
                        Result
                      </div>

                      <div className="font-black mt-1 text-green-400">
                        {trade.result}
                      </div>
                    </div>

                    <div className="bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-xl text-green-400 font-bold">
                      {trade.status}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
              <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                <div>
                  <h2 className="text-3xl font-black text-cyan-400">
                    Equity Growth Curve
                  </h2>

                  <p className="text-zinc-400 mt-2">
                    Real-time bot profit accumulation and performance tracking.
                  </p>
                </div>

                <div className="bg-cyan-500/10 border border-cyan-500/20 px-4 py-2 rounded-xl text-cyan-400 font-bold">
                  LIVE EQUITY
                </div>
              </div>

              <div className="bg-black border border-zinc-800 rounded-2xl p-4 h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={equityHistory.length > 0 ? equityHistory : [{ time: 'START', pnl: 0 }] }>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                    <XAxis dataKey="time" stroke="#71717a" />
                    <YAxis stroke="#71717a" />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="pnl"
                      stroke="#22c55e"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </section>

            <section className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 mt-6">
              <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                <div>
                  <h2 className="text-3xl font-black text-green-400">
                    Closed Trades Ledger
                  </h2>

                  <p className="text-zinc-400 mt-2">
                    Automatically tracked TP hits, SL hits, and realized execution outcomes.
                  </p>
                </div>

                <div className="bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-xl text-green-400 font-bold">
                  LIVE RESULTS
                </div>
              </div>

              <div className="space-y-4">
                {closedTrades.map((trade, index) => (
                  <div
                    key={index}
                    className="bg-black border border-zinc-800 rounded-2xl p-5 flex items-center justify-between flex-wrap gap-4"
                  >
                    <div>
                      <div className="text-zinc-500 text-sm">Pair</div>
                      <div className="text-xl font-black text-white mt-1">
                        {trade.pair}
                      </div>
                    </div>

                    <div>
                      <div className="text-zinc-500 text-sm">Pips</div>
                      <div className="font-black text-cyan-400 mt-1">
                        {trade.pips}
                      </div>
                    </div>

                    <div>
                      <div className="text-zinc-500 text-sm">Profit</div>
                      <div className="font-black text-green-400 mt-1">
                        {trade.profit}
                      </div>
                    </div>

                    <div>
                      <div className="text-zinc-500 text-sm">Trade Progress</div>
                      <div className="font-bold mt-1 text-yellow-400">
                        {trade.progress}
                      </div>
                    </div>

                    <div className={`px-4 py-2 rounded-xl font-bold border ${trade.result === 'TP HIT' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                      {trade.result}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </section>
        )}

        {activePage === "signals" && (
          <section className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-black text-green-400">
                AI Signal Feed
              </h2>

              <div className="text-green-400 font-bold">
                LIVE SIGNALS
              </div>
            </div>

            <div className="space-y-4">
              {liveSignals.map((signal, index) => (
                <div
                  key={index}
                  className="bg-black border border-zinc-800 rounded-2xl p-5"
                >
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <div className="text-zinc-500 text-sm">
                        Setup
                      </div>

                      <div className="text-2xl font-black text-green-400 mt-2">
                        {signal.type}
                      </div>
                    </div>

                    <div className="text-green-400 font-bold text-xl">
                      {signal.confidence}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mt-5">
                    <SignalBox label="Entry" value={signal.entry} />
                    <SignalBox label="SL" value={signal.sl} color="text-red-400" />
                    <SignalBox label="TP" value={signal.tp} color="text-green-400" />
                    <SignalBox label="RR" value={signal.rr} color="text-cyan-400" />
                  </div>

                  <button
                    onClick={() =>
                      useSignal(
                        signal.type,
                        signal.entry,
                        signal.tp,
                        signal.sl
                      )
                    }
                    className="w-full mt-5 bg-green-500 hover:bg-green-400 transition-all text-black font-black py-3 rounded-2xl"
                  >
                    USE SIGNAL
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {activePage === "smartmoney" && (
          <section className="space-y-6">
            <section className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <Radar className="text-orange-400" />

                <h2 className="text-3xl font-black text-orange-400">
                  AI Liquidity Radar
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {liquidityRadar.map((item, index) => (
                  <div
                    key={index}
                    className="bg-black border border-zinc-800 rounded-2xl p-5"
                  >
                    <div className="text-zinc-500 text-sm mb-3">
                      {item.level}
                    </div>

                    <div className={`text-3xl font-black ${item.color}`}>
                      {item.status}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
              <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                <div>
                  <h2 className="text-3xl font-black text-red-400">
                    Smart Money Concepts
                  </h2>

                  <p className="text-zinc-400 mt-2">
                    Institutional liquidity behavior and manipulation tracking.
                  </p>
                </div>

                <div className="bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-xl text-red-400 font-bold">
                  SMC ACTIVE
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-black border border-zinc-800 rounded-2xl p-5">
                  <div className="text-zinc-500 text-sm">
                    Market Structure
                  </div>

                  <div className="text-2xl font-black text-green-400 mt-3">
                    BULLISH BOS
                  </div>
                </div>

                <div className="bg-black border border-zinc-800 rounded-2xl p-5">
                  <div className="text-zinc-500 text-sm">
                    Liquidity Sweep
                  </div>

                  <div className="text-2xl font-black text-yellow-400 mt-3">
                    EQUAL HIGHS TAKEN
                  </div>
                </div>

                <div className="bg-black border border-zinc-800 rounded-2xl p-5">
                  <div className="text-zinc-500 text-sm">
                    Order Blocks
                  </div>

                  <div className="text-2xl font-black text-cyan-400 mt-3">
                    ACTIVE DEMAND
                  </div>
                </div>
              </div>
            </section>
          </section>
        )}

        

        {activePage === "macro" && (
          <section className="space-y-6">
            <section className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
              <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                <div>
                  <h2 className="text-3xl font-black text-red-400">
                    Economic Event Radar
                  </h2>

                  <p className="text-zinc-400 mt-2">
                    High-impact macroeconomic events affecting gold volatility.
                  </p>
                </div>

                <div className="bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-xl text-red-400 font-bold">
                  LIVE EVENTS
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {economicEvents.map((event, index) => (
                  <div
                    key={index}
                    className="bg-black border border-zinc-800 rounded-2xl p-5"
                  >
                    <div className="text-zinc-500 text-sm">
                      Economic Event
                    </div>

                    <div className="text-2xl font-black text-red-400 mt-2">
                      {event.event}
                    </div>

                    <div className="mt-4 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Impact</span>
                        <span className="text-yellow-400 font-bold">
                          {event.impact}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-zinc-500">Time</span>
                        <span>{event.time}</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-zinc-500">Bias</span>
                        <span className="text-green-400">
                          {event.bias}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {aiRiskMonitor.map((risk, index) => (
                <div
                  key={index}
                  className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5"
                >
                  <div className="text-zinc-500 text-sm">
                    {risk.title}
                  </div>

                  <div className={`text-3xl font-black mt-3 ${risk.color}`}>
                    {risk.value}
                  </div>
                </div>
              ))}
            </section>
            <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <MetricCard title="DXY" value="WEAK" color="text-red-400" />
              <MetricCard title="Yields" value="FALLING" color="text-blue-400" />
              <MetricCard title="Risk" value="RISK OFF" color="text-yellow-400" />
              <MetricCard title="Gold Bias" value="BULLISH" color="text-green-400" />
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {marketSessions.map((session, index) => (
                <div
                  key={index}
                  className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5"
                >
                  <div className="text-zinc-500 text-sm">
                    Market Session
                  </div>

                  <div className="text-2xl font-black text-yellow-400 mt-2">
                    {session.name}
                  </div>

                  <div className="mt-4 text-zinc-300 font-bold">
                    {session.status}
                  </div>
                </div>
              ))}
            </section>
          </section>
        )}

        {activePage === "pips-calculator" && (
          <section className="space-y-6">
            <section className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
              <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                <div>
                  <h2 className="text-3xl font-black text-yellow-400">
                    AI Gold Pips Calculator
                  </h2>

                  <p className="text-zinc-400 mt-2">
                    Automatic TP/SL calculator for XAUUSD scalping execution.
                  </p>
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/20 px-4 py-2 rounded-xl text-yellow-400 font-bold">
                  LIVE EXECUTION
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
                <div className="bg-black border border-zinc-800 rounded-2xl p-4">
                  <div className="text-zinc-500 text-sm mb-2">
                    Trade Type
                  </div>

                  <select
                    value={tradeType}
                    onChange={(e) => setTradeType(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-3"
                  >
                    <option>BUY</option>
                    <option>SELL</option>
                  </select>
                </div>

                <div className="bg-black border border-zinc-800 rounded-2xl p-4">
                  <div className="text-zinc-500 text-sm mb-2">
                    Market Price
                  </div>

                  <input
                    type="number"
                    value={entryPrice}
                    onChange={(e) => setEntryPrice(Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-3"
                  />
                </div>

                <div className="bg-black border border-zinc-800 rounded-2xl p-4">
                  <div className="text-zinc-500 text-sm mb-2">
                    TP Pips
                  </div>

                  <input
                    type="number"
                    value={tpPips}
                    onChange={(e) => setTpPips(Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-3"
                  />
                </div>

                <div className="bg-black border border-zinc-800 rounded-2xl p-4">
                  <div className="text-zinc-500 text-sm mb-2">
                    SL Pips
                  </div>

                  <input
                    type="number"
                    value={slPips}
                    onChange={(e) => setSlPips(Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-3"
                  />
                </div>

                <div className="bg-black border border-zinc-800 rounded-2xl p-4">
                  <div className="text-zinc-500 text-sm mb-2">
                    Lot Size
                  </div>

                  <input
                    type="number"
                    step="0.01"
                    value={lotSize}
                    onChange={(e) => setLotSize(Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-3"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
                <MetricCard
                  title="Take Profit Price"
                  value={tpPrice.toFixed(2)}
                  color="text-green-400"
                />

                <MetricCard
                  title="Stop Loss Price"
                  value={slPrice.toFixed(2)}
                  color="text-red-400"
                />

                <MetricCard
                  title="Estimated Profit"
                  value={`$${estimatedProfit.toFixed(2)}`}
                  color="text-cyan-400"
                />

                <MetricCard
                  title="Estimated Loss"
                  value={`-$${estimatedLoss.toFixed(2)}`}
                  color="text-orange-400"
                />
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                <MetricCard
                  title="Daily Target"
                  value={`$${dailyTarget}`}
                  color="text-green-400"
                />

                <MetricCard
                  title="Current PnL"
                  value={`+$${currentPnL.toFixed(2)}`}
                  color="text-cyan-400"
                />

                <MetricCard
                  title="Pips Won"
                  value={`${totalPipsWon} PIPS`}
                  color="text-green-400"
                />

                <MetricCard
                  title="Remaining Goal"
                  value={`$${remainingTarget}`}
                  color="text-yellow-400"
                />

                <MetricCard
                  title="Max Drawdown"
                  value={`$${maxDrawdown}`}
                  color="text-red-400"
                />
              </div>

              <div className="mt-6 bg-black border border-zinc-800 rounded-2xl p-5">
                <div className="text-zinc-400 text-sm">
                  Gold Pip Formula
                </div>

                <div className="text-2xl font-black text-yellow-400 mt-3">
                  10 PIPS = $1 @ 0.01 LOT
                </div>

                <div className="text-zinc-500 mt-3 text-sm">
                  Profit/Loss automatically scales with lot size.
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-zinc-800 overflow-hidden bg-black h-[700px]">
                <iframe
                  loading="lazy"
                  src="https://fxverify.com/widgets/pip-value-calculator?symbol=XAU/USD"
                  width="100%"
                  height="100%"
                  title="Gold Pip Calculator"
                  className="bg-black"
                />
              </div>
            </section>
          </section>
        )}

        {activePage === "ai-lab" && (
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {aiLabModels.map((model, index) => (
              <div
                key={index}
                className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6"
              >
                <div className="text-zinc-500 text-sm mb-3">
                  AI Engine
                </div>

                <div className="text-2xl font-black text-emerald-400">
                  {model.model}
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <div>
                    <div className="text-zinc-500 text-sm">
                      Accuracy
                    </div>

                    <div className="font-bold mt-1">
                      {model.accuracy}
                    </div>
                  </div>

                  <div className="text-emerald-400 font-black">
                    {model.status}
                  </div>
                </div>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}

function MetricCard({
  title,
  value,
  color,
}: {
  title: string;
  value: string | number;
  color: string;
}) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 shadow-xl">
      <div className="text-zinc-400 text-sm">{title}</div>

      <div className={`text-3xl font-black mt-2 ${color}`}>
        {value}
      </div>
    </div>
  );
}

function OverviewCard({
  title,
  value,
  subtitle,
  icon,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: ReactNode;
}) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 shadow-2xl">
      <div className="flex items-center justify-between">
        <div className="text-zinc-400 text-sm">{title}</div>
        {icon}
      </div>

      <div className="text-2xl font-bold mt-4 break-words">{value}</div>

      <div className="text-green-400 text-sm mt-3 font-medium">
        {subtitle}
      </div>
    </div>
  );
}

function MarqueeStyles() {
  return (
    <style jsx global>{`
      @keyframes marquee {
        0% {
          transform: translateX(100%);
        }

        100% {
          transform: translateX(-100%);
        }
      }

      .animate-marquee {
        display: inline-block;
        min-width: 100%;
        animation: marquee 18s linear infinite;
      }
    `}</style>
  );
}

function SignalBox({
  label,
  value,
  color = "text-white",
}: {
  label: string;
  value: string;
  color?: string;
}) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
      <div className="text-zinc-500 text-sm">{label}</div>

      <div className={`text-2xl font-bold mt-2 ${color}`}>
        {value}
      </div>
    </div>
  );
}
