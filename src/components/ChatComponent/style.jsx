import styled from 'styled-components';

// ── Slide / toggle  ──
export const SlideContainer = styled.div`
  width: 20rem;
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 9999;
`;

export const GifImage = styled.img`
  width: 100%;
  display: block;
  cursor: pointer;
`;

export const GifWrapper = styled.div`
  position: relative;
  display: flex;
  right:-4rem;
  flex-direction: column;
  align-items: center;
  padding-top: 10rem;
`;

export const SpeechBubble = styled.div`
  position: absolute;
  top: 7.5rem;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  border: 2px solid #333;
  border-radius: 12px;
  padding: 8px 14px;
  font-size: 0.85rem;
  font-weight: 500;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 10;

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 8px solid transparent;
    border-top-color: white;
  }

  &::before {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 10px solid transparent;
    border-top-color: #333;
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;
  margin-left: auto;
  line-height: 1;
  padding: 0 4px;
`;

// ── Chat interno  ──
export const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 16rem;
  position: relative;
  z-index: 1;
`;

export const ActionsRow = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding-bottom: 0.6rem;
  gap: 6px;
`;

export const ActionButton = styled.button`
  display: flex;
  background-color: ${(p) => p.$bgColor};
  flex: 1;
  min-width: 0;
  height: 4rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  border: 2px solid black;
  cursor: pointer;
  transition: transform 0.1s;

  &:hover {
    transform: scale(1.05);
  }
`;

export const IconWrapper = styled.span`
  margin-top: 10px;
  display: flex;
`;

export const ActionLabel = styled.p`
  font-size: 0.8rem;
  margin-top: -2px;
  pointer-events: none;
`;

export const SatisfactionContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const StatusLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
`;

export const SatisfactionTrack = styled.div`
  flex: 1;
  height: 10px;
  background-color: #ddd;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid #999;
`;

export const SatisfactionFill = styled.div`
  width: ${(p) => p.$value}%;
  height: 100%;
  background-color: ${(p) =>
    p.$value > 60 ? '#4caf50' : p.$value > 30 ? '#ff9800' : '#f44336'};
  border-radius: 6px;
  transition: width 0.3s, background-color 0.3s;
`;

export const SatisfactionPercent = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  min-width: 38px;
`;

export const Chatbox = styled.div`
  box-sizing: border-box;
  background-color: #aad9f3;
  border: 2px solid black;
  height: 20rem;
  width: 20rem;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding-inline: 1rem;
`;

export const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4px;
`;

export const PetImage = styled.img`
  width: 56px;
  height: 48px;
`;

export const PetName = styled.p`
  font-size: 20px;
  font-weight: 600;
`;

export const MessagesContainer = styled.div`
  box-sizing: border-box;
  background-color: white;
  width: 100%;
  height: 12rem;
  border-radius: 8px;
  padding: 6px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const MessageBubble = styled.div`
  align-self: ${(p) => (p.$isUser ? 'flex-end' : 'flex-start')};
  background-color: ${(p) => (p.$isUser ? '#dcf8c6' : '#f0f0f0')};
  border-radius: 10px;
  padding: 6px 10px;
  max-width: 85%;
  font-size: 14px;
  word-break: break-word;
`;

export const LoadingMessage = styled.div`
  align-self: flex-start;
  background-color: #f0f0f0;
  border-radius: 10px;
  padding: 6px 10px;
  font-size: 14px;
  font-style: italic;
  color: #888;
`;

export const InputRow = styled.div`
  display: flex;
  gap: 4px;
  width: 100%;
  padding-bottom: 8px;
`;

export const InputField = styled.input`
  background-color: white;
  flex: 3;
  height: 2rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  padding-inline: 8px;
  outline: none;
`;

export const SendButton = styled.div`
  background-color: #f4e1a5;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  height: 2rem;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 18rem;
  border: 2px solid #333;
`;

export const ModalTitle = styled.p`
  font-size: 1.1rem;
  font-weight: 700;
  text-align: center;
  margin: 0;
`;

export const OptionCard = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  border-radius: 8px;
  border: ${(p) => (p.$isActive ? '2px solid #4caf50' : '2px solid #ddd')};
  cursor: pointer;
  background-color: ${(p) => (p.$isActive ? '#f0fff0' : '#fff')};
  transition: background 0.2s;

  &:hover {
    background-color: ${(p) => (p.$isActive ? '#f0fff0' : '#f5f5f5')};
  }
`;

export const OptionImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
`;

export const OptionName = styled.p`
  font-weight: 600;
  margin: 0;
`;

export const OptionSubtitle = styled.p`
  font-size: 0.75rem;
  color: #666;
  margin: 0;
`;

export const CancelButton = styled.div`
  text-align: center;
  padding: 8px;
  border-radius: 6px;
  background-color: #eee;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.85rem;
`;
