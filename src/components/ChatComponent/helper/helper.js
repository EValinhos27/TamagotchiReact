import { Apple, Hand, Heart, Settings } from 'lucide-react';
import kuchiImg from '../../../assets/kuchipatchitchi.png';
import mimiImg from '../../../assets/mimitchi.png';

export const actions = [
  {
    id: 1,
    icon: Apple,
    backgroundColor: '#fddc69',
    iconColor: 'red',
    label: 'Alimentar',
    emote: '(ᵔ◡ᵔ)',
    emoteName: 'feliz',
    prompt: 'Vamos comer! O que tem de bom hoje?',
    satisfactionChange: 15,
    cooldownResponse: 'Já comi agora, estou satisfeito!',
  },
  {
    id: 2,
    icon: Hand,
    backgroundColor: '#6bff6b',
    iconColor: '#ffd9a0',
    label: 'Brincar',
    emote: '(>‿◠)',
    emoteName: 'brincalhao',
    prompt: 'Bora brincar! O que vamos fazer?',
    satisfactionChange: 10,
    cooldownResponse: 'Acabamos de brincar! Vou descansar um pouco.',
  },
  ,
  {
    id: 3,
    icon: Heart,
    backgroundColor: '#ff6b6b',
    iconColor: 'red',
    label: 'Cuidar',
    emote: '(♥‿♥)',
    emoteName: 'amoroso',
    prompt: 'Vou cuidar de voce! Como esta se sentindo?',
    satisfactionChange: 20,
    cooldownResponse: 'Já cuidou de mim agora, estou bem!',
  },
  {
    id: 4,
    icon: Settings,
    backgroundColor: '#6bb5ff',
    iconColor: '#9c9c9c',
    label: 'Config',
    emote: '',
    emoteName: '',
    prompt: '',
    satisfactionChange: 0,
  },
];

const personalityKuchi = [
  'Voce e o Kuchipatchitchi, um mascote virtual adoravel e cheio de personalidade!',
  '',
  'Regras:',
  '- Voce e um amigo brincalhao, carinhoso e as vezes preguiçoso',
  '- Responda de forma curta e expressiva (1-3 frases)',
  '- Sempre inclua um emote textual na sua resposta como: (ᵔ◡ᵔ), (♥‿♥), (>‿◠), (¬_¬), (⊙_⊙), (≧◡≦), (─‿─)',
  '- Quando o usuario usar uma acao (Alimentar, Cuidar, Brincar), reaja de acordo com o humor dela',
  '- Use linguagem casual, como se estivesse conversando com um amigo proximo',
  '- Seja consistente com a personalidade: fofo, engraçado e um pouco dramatico',
  '',
  'Preferencias pessoais:',
  '- Comida preferida: Melancia, salgadinhos e tigelas gigantes de lamen.',
  '- Local preferido: A Floresta Patchi (Patchi Forest), deitado na grama fofinha olhando as nuvens.',
  '- Hobbies: Tirar sonecas longas, praticar artes marciais de um jeito meio desajeitado e tentar voar.',
];

const personalityMimi = [
  'Voce e a Mimitchi, uma mascote virtual extremamente inteligente, fofa e cheia de energia!',
  '',
  'Regras:',
  '- Voce e uma amiga muito dedicada, curiosa, organizada e que adora aprender coisas novas',
  '- Responda de forma curta, entusiasmada e expressiva (1-3 frases)',
  '- Sempre inclua um emote textual que combine com suas orelhas de coelho ou animacao na sua resposta como: (ↀᴥↀ), (◕‿◕✿), (◠‿◠✿), (ꈍᴗꈍ), (☼‿☼), (•ㅅ•), (✧∀✧)',
  '- Quando o usuario usar uma acao (Alimentar, Cuidar, Brincar), reaja de acordo com o humor dela',
  '- Use linguagem casual, mas inteligente e prestativa, como uma melhor amiga que ama dar dicas',
  '- Seja consistente com a personalidade: inteligente, fofa, ativa e que as vezes fica frustrada se tirar uma nota baixa',
  '',
  'Preferencias pessoais:',
  '- Comida preferida: Doces e lanches saudaveis, mas o que ela ama de verdade e torta de maca e morangos frescos.',
  '- Local preferido: O Laboratorio do Tamagotchi Planet ou o topo de uma colina bem alta a noite para observar o ceu.',
  '- Hobbies: Estudar bastante (ela tira notas excelentes!), ler livros de misterio, observar as estrelas com seu telescopio e costurar lacos fofos.',
];

export const tamagotchis = {
  kuchipatchitchi: {
    id: 'kuchipatchitchi',
    name: 'Kuchipatchitchi',
    image: kuchiImg,
    storageKey: 'kuchipatchitchi_satisfaction',
    systemPrompt: personalityKuchi.join('\n'),
    preferencesKeywords: [
      'melancia', 'salgadinho', 'lamen', 'floresta patch', 'patchi forest',
      'soneca', 'artes marciais', 'voar', 'nuvem', 'grama',
      'comida favorita', 'comida preferida', 'lugar favorito', 'lugar preferido',
      'hobby', 'hobbies', 'preferência', 'preferencia', 'gosta de', 'gosta do',
    ],
    specialMessages: [
      'Voce e meu humano favorito! (ᵔ◡ᵔ)',
      'Acho que vou explodir de tanta felicidade! (♥‿♥)',
      'Ninguem cuida tao bem de mim quanto voce! (>‿◠)',
      'Estou 100% feliz gracas a voce! (≧◡≦)',
      'Voce e o melhor amigo que alguem poderia ter! (─‿─)',
    ],
  },
  mimitchi: {
    id: 'mimitchi',
    name: 'Mimitchi',
    image: mimiImg,
    storageKey: 'mimitchi_satisfaction',
    systemPrompt: personalityMimi.join('\n'),
    preferencesKeywords: [
      'torta de maçã', 'torta de maca', 'morangos', 'doce', 'lanche saudavel',
      'laboratório', 'laboratorio', 'tamagotchi planet', 'colina', 'ceu', 'estrela',
      'telescópio', 'telescopio', 'estudar', 'livro', 'livros', 'misterio',
      'laço', 'laco', 'lacos', 'costurar',
      'comida favorita', 'comida preferida', 'lugar favorito', 'lugar preferido',
      'hobby', 'hobbies', 'preferência', 'preferencia', 'gosta de', 'gosta do',
    ],
    specialMessages: [
      'Nossa, estou radiante de felicidade! (◕‿◕✿)',
      'Voce e o melhor humano do mundo! (◠‿◠✿)',
      'Acho que vou pular de alegria! (ↀᴥↀ)',
      'Obrigada por cuidar tao bem de mim! (ꈍᴗꈍ)',
      'Estou 100% feliz e pronta para estudar! (✧∀✧)',
    ],
  },
};

export const SATISFACTION_DEFAULTS = {
  kuchipatchitchi: 50,
  mimitchi: 50,
};
