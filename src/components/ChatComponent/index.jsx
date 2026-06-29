import { useEffect, useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { actions, tamagotchis, SATISFACTION_DEFAULTS } from './helper/helper';
import tamaGif from '../../assets/tama-gif.gif';
import mimiGif from '../../assets/mimi.gif';

const gifMap = {
  kuchipatchitchi: tamaGif,
  mimitchi: mimiGif,
};
import {
  SlideContainer,
  GifWrapper,
  GifImage,
  SpeechBubble,
  CloseButton,
  Container,
  ActionsRow,
  ActionButton,
  IconWrapper,
  ActionLabel,
  SatisfactionContainer,
  StatusLabel,
  SatisfactionTrack,
  SatisfactionFill,
  SatisfactionPercent,
  Chatbox,
  ChatHeader,
  PetImage,
  PetName,
  MessagesContainer,
  MessageBubble,
  LoadingMessage,
  InputRow,
  InputField,
  SendButton,
  ModalOverlay,
  ModalContent,
  ModalTitle,
  OptionCard,
  OptionImage,
  OptionName,
  OptionSubtitle,
  CancelButton,
} from './style';

const ACTIVE_KEY = 'kuchipatchitchi_active';
const DECAY_INTERVAL = 30000;
const DECAY_AMOUNT = 2;
const MAX_SAT = 100;
const MIN_SAT = 0;
const ACTION_COOLDOWN = 10000;

const loadActive = () => {
  try {
    const stored = localStorage.getItem(ACTIVE_KEY);
    if (stored && tamagotchis[stored]) return stored;
  } catch { }
  return 'kuchipatchitchi';
};

const loadSatisfaction = (id) => {
  try {
    const key = tamagotchis[id]?.storageKey;
    if (!key) return SATISFACTION_DEFAULTS[id] ?? 50;
    const stored = localStorage.getItem(key);
    if (!stored) return SATISFACTION_DEFAULTS[id] ?? 50;
    const { value, timestamp } = JSON.parse(stored);
    const elapsed = Date.now() - timestamp;
    const decayed = value - Math.floor(elapsed / DECAY_INTERVAL) * DECAY_AMOUNT;
    return Math.max(MIN_SAT, Math.min(MAX_SAT, decayed));
  } catch {
    return SATISFACTION_DEFAULTS[id] ?? 50;
  }
};

const saveSatisfaction = (id, value) => {
  const key = tamagotchis[id]?.storageKey;
  if (!key) return;
  localStorage.setItem(key, JSON.stringify({ value, timestamp: Date.now() }));
};

export const ChatComponent = () => {
  const [activeId, setActiveId] = useState(loadActive);
  const active = tamagotchis[activeId];

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [satisfaction, setSatisfaction] = useState(() => loadSatisfaction(activeId));
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [phraseIdx, setPhraseIdx] = useState(0);
  const phrases = ['Vem brincar comigo!', 'Estou com saudades!', 'Que tal um carinho?', 'Bora conversar?', 'Olha pra mim!'];

  useEffect(() => {
    if (isChatOpen) return;
    const id = setInterval(() => setPhraseIdx((p) => (p + 1) % phrases.length), 4000);
    return () => clearInterval(id);
  }, [isChatOpen]);
  const chatEndRef = useRef(null);
  const lastActionRef = useRef({});

  const API_URL = 'https://api-tamagochi.onrender.com';

const sendToApi = async (conversation) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: conversation, systemPrompt: active.systemPrompt }),
      });
      const data = await response.json();
      return data.reply;
    } catch (error) {
      console.error('Erro ao chamar API:', error);
      return '... ah, acho que deu um erro... zzz';
    } finally {
      setLoading(false);
    }
  };

  // Inicia chat ao montar ou trocar de Tamagotchi
  useEffect(() => {
    const initChat = async () => {
      const reply = await sendToApi([]);
      setMessages([{ role: 'assistant', content: reply }]);
    };
    initChat();
  }, [activeId]);

  // Decaimento automático
  useEffect(() => {
    const interval = setInterval(() => {
      setSatisfaction((prev) => {
        const next = prev - DECAY_AMOUNT;
        const clamped = Math.max(MIN_SAT, next);
        saveSatisfaction(activeId, clamped);
        return clamped;
      });
    }, DECAY_INTERVAL);
    return () => clearInterval(interval);
  }, [activeId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;
    const userMessage = { role: 'user', content: text };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputText('');

    // Verifica se mencionou preferências pessoais → satisfação +10
    const lowerText = text.toLowerCase();
    const keywords = active.preferencesKeywords || [];
    const mencionouPreferencia = keywords.some((kw) => lowerText.includes(kw));
    if (mencionouPreferencia) {
      setSatisfaction((prev) => {
        const next = prev + 10;
        const clamped = Math.min(MAX_SAT, next);
        saveSatisfaction(activeId, clamped);
        return clamped;
      });
    }

    const reply = await sendToApi(updatedMessages);
    setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
  };

  const handleAction = async (action) => {
    // Botão Config abre o modal
    if (action.label === 'Config') {
      setShowModal(true);
      return;
    }

    // Cooldown de 10s para mesma ação
    const now = Date.now();
    const lastTime = lastActionRef.current[action.id];
    if (lastTime && now - lastTime < ACTION_COOLDOWN) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: `${action.cooldownResponse} ${action.emote}` },
      ]);
      return;
    }
    lastActionRef.current[action.id] = now;

    const change = action.satisfactionChange || 0;
    const newSatisfaction = Math.max(MIN_SAT, Math.min(MAX_SAT, satisfaction + change));
    setSatisfaction(newSatisfaction);
    saveSatisfaction(activeId, newSatisfaction);

    const actionMessage = {
      role: 'user',
      content: `*usa ação: ${action.label}* — ${action.prompt}`,
    };

    let updatedMessages;

    if (newSatisfaction >= 100 && satisfaction < 100) {
      const msgs = active.specialMessages;
      const specialMsg = msgs[Math.floor(Math.random() * msgs.length)];
      updatedMessages = [
        ...messages,
        { role: 'assistant', content: `✨ ${specialMsg} ✨` },
        actionMessage,
      ];
      setMessages(updatedMessages);
    } else {
      updatedMessages = [...messages, actionMessage];
      setMessages(updatedMessages);
    }

    const reply = await sendToApi(updatedMessages);
    setMessages((prev) => [...prev, { role: 'assistant', content: `${reply} ${action.emote}` }]);
  };

  const handleSwitch = (newId) => {
    if (newId === activeId) {
      setShowModal(false);
      return;
    }
    // Salva satisfação atual
    saveSatisfaction(activeId, satisfaction);
    // Reseta cooldown ao trocar de personagem
    lastActionRef.current = {};
    // Troca
    setActiveId(newId);
    localStorage.setItem(ACTIVE_KEY, newId);
    setSatisfaction(loadSatisfaction(newId));
    setMessages([]);
    setShowModal(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') sendMessage(inputText);
  };

  return (
    <SlideContainer>
      {isChatOpen && (
        <ActionsRow>
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <ActionButton
                key={action.id}
                type="button"
                $bgColor={action.backgroundColor}
                onClick={() => handleAction(action)}
              >
                <IconWrapper>
                  <Icon fill={action.iconColor} size={40} />
                </IconWrapper>
                <ActionLabel>{action.label}</ActionLabel>
              </ActionButton>
            );
          })}
        </ActionsRow>
      )}
      <AnimatePresence initial={false} mode="wait">
        {!isChatOpen ? (
          <motion.div
            key="gif"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <GifWrapper>
              <SpeechBubble>{phrases[phraseIdx]}</SpeechBubble>
              <GifImage src={gifMap[activeId]} onClick={() => setIsChatOpen(true)} alt="Tamagotchi" />
            </GifWrapper>
          </motion.div>
        ) : (
          <motion.div
            key="chat"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
          >
            <Container>
                {/* SATISFAÇÃO */}
                <SatisfactionContainer>
                <StatusLabel>Status:</StatusLabel>
                <SatisfactionTrack>
                  <SatisfactionFill $value={satisfaction} />
                </SatisfactionTrack>
                <SatisfactionPercent>{satisfaction}%</SatisfactionPercent>
              </SatisfactionContainer>

              {/* CHATBOX */}
              <Chatbox>
                {/* TOP CHAT */}
                <ChatHeader>
                  <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
                    <PetImage src={active.image} />
                    <PetName>{active.name}</PetName>
                  </div>
                  <CloseButton onClick={() => setIsChatOpen(false)}>X</CloseButton>
                </ChatHeader>

                {/* MESSAGES */}
                <MessagesContainer>
                  {messages.map((msg, idx) => (
                    <MessageBubble key={idx} $isUser={msg.role === 'user'}>
                      {msg.content}
                    </MessageBubble>
                  ))}
                  {loading && (
                    <LoadingMessage>{active.name} esta pensando...</LoadingMessage>
                  )}
                  <div ref={chatEndRef} />
                </MessagesContainer>

                {/* INPUT */}
                <InputRow>
                  <InputField
                    type="text"
                    placeholder="Mensagem..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <SendButton onClick={() => sendMessage(inputText)}>
                    Enviar
                  </SendButton>
                </InputRow>
              </Chatbox>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL */}
      {showModal && (
        <ModalOverlay onClick={() => setShowModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalTitle>Escolha seu Tamagotchi</ModalTitle>
            {Object.values(tamagotchis).map((t) => (
              <OptionCard
                key={t.id}
                $isActive={t.id === activeId}
                onClick={() => handleSwitch(t.id)}
              >
                <OptionImage src={t.image} />
                <div>
                  <OptionName>{t.name}</OptionName>
                  <OptionSubtitle>
                    {t.id === activeId ? 'Ativo' : 'Clique para trocar'}
                  </OptionSubtitle>
                </div>
              </OptionCard>
            ))}
            <CancelButton onClick={() => setShowModal(false)}>
              Cancelar
            </CancelButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </SlideContainer>
  );
};
