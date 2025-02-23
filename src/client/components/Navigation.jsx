import ArticleIcon from '@mui/icons-material/Article';
import GroupIcon from '@mui/icons-material/Group';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PaymentIcon from '@mui/icons-material/Payment';
import PianoIcon from '@mui/icons-material/Piano';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import EditNoteIcon from '@mui/icons-material/EditNote';


export default function Navigation(role) {
  // console.log('role', role);

  const navigation = [
    {
      segment: 'contracts',
      title: 'Договоры',
      icon: <ArticleIcon />,
    },
  ];

  /* if(role != 'manager'){
    navigation.push({
      segment: 'moderation',
      title: 'На модерации',
      icon: <EditNoteIcon />,
    })
  } */
  
  navigation.push(
    {
      kind: 'header',
      title: 'Справочник',
    },
  
    {
      segment: 'contractors',
      title: 'Исполнители',
      icon: <HeadsetMicIcon />,
    },
    {
      segment: 'tracks',
      title: 'Треки',
      icon: <AudiotrackIcon />,
    },
    {
      segment: 'licensors',
      title: 'Лицензиары',
      icon: <LocalPoliceIcon />,
    },
  )
  
  if(role != 'moderator'){
    navigation.push(  {
      segment: 'incomes',
      title: 'Доходы',
      icon: <MonetizationOnIcon />,
    },
    {
      segment: 'payments',
      title: 'Выплаты',
      icon: <PaymentIcon />,
    },)
  }


  navigation.push(
    {
      kind: 'header',
      title: 'Расчеты',
    },
  
    {
      segment: 'royalties',
      title: 'Расчёт роялти',
      icon: <PianoIcon />,
    },
    {
      segment: 'reports',
      title: 'Денежный отчет',
      icon: <PriceChangeIcon />,
    }
  )
  
  navigation.push({
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Административные',
  },
  {
    segment: 'users',
    title: 'Пользователи',
    icon: <GroupIcon />,
  }) 

  if(role){
    return navigation;
  }
}
  
    
  
