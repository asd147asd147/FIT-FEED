import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import ShareIcon from '@material-ui/icons/Share';
import IconButton from '@material-ui/core/IconButton';
import MessageOutlinedIcon from '@material-ui/icons/MessageOutlined';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import Badge from'@material-ui/core/Badge';

const useStyles = makeStyles((theme) => ({
    description: {
        fontSize: '1.1em',
        lineHeight: '1.6',
        padding: theme.spacing(1),
        whiteSpace: 'pre-wrap',
    },
    avatar: {
        padding: theme.spacing(1),
        display: 'flex'
    },
    userName: {
        padding: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        fontSize: '1.2em',
        // cursor: ,
    },
    repContent: {
        padding: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        fontSize: '1em',
        // cursor: ,
    },
    mda: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        flexFlow: 'row nowrap',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    imgContain: { // img 밖 div style
        padding: theme.spacing(1),
        display: 'flex',
        width: '100%',
        height: '500px',
        justifyContent:'center',
    },
    image: { // img
        objectPosition: '50% 50%',
        objectFit: 'contain',
    },
    icons: {
        color : "primary",
        fontSize : "large",
        margin: theme.spacing(1),
    }
}));
const posts = {
    "pageName": "xda-developers.com",
    "pageImage": {
        "src": "https://scontent-gmp1-1.xx.fbcdn.net/v/t1.0-1/cp0/p40x40/120968604_10157792325131302_7014261584916210311_o.jpg?_nc_cat=1&ccb=3&_nc_sid=1eb0c7&_nc_eui2=AeEBX59GjKzVUEHqJS72qDAy2PlZ9YzC5KbY-Vn1jMLkpvSZSErkXwZsPG6Z_FAMMouAXWSmSmQzBejbukdF_Hp_&_nc_ohc=zhY4Ywpqk9AAX8HXexn&_nc_ht=scontent-gmp1-1.xx&tp=27&oh=de65717e637a0ffafc6af0fd0761e618&oe=60622509",
        "height": 40,
        "width": 40
    },
    "description": "😀 섣불리 '할 수 있다'고 말한다. SW 엔지니어들에게 가장 금기시 되는 말 아닐까? 이 정도는 사실상 미리 다 만들어 놓고 당장 시연할 준비가 됐을 쯤에나 할 수 있다. 개발자들은 기본적으로 INTP기 때문에 무언가 '할 수 있다'라던가 '100% 가능' 같은 확실하고 완벽한 단어를 피한다.\n\
\n\
코딩 학원 수료생들은 미팅이나 실제 업무 직전에 \"아 그거 해 봤어요\"와 같은 말을 너무나도 쉽고 빠르게 내뱉는다. 그 정도는 가소롭다는 듯한 미소와 끄덕임은 덤인데 해보기는 무슨 학원에서 4주짜리 클론 코딩 해 본 것이 전부일 것이며 그것도 5명의 팀원들과 함께 한 것을 '여러 사람과의 협업'으로 포장하고, 끽 해야 두 명이서 적당히 백엔드/프론트 엔드 나눠 놓고 '저는 서버 개발을 담당했으며...'라고 말한다.\n\
\n\
🙆🏼 ♂️\"네 한 번 써 본적 있어요~\"\n\
🙋🏻 ♀️\"네네, 그거 해 봤어요\"\n\
\n\
사실 코딩 학원은 SW 업계를 교란하고 개발자들을 혼란에 빠뜨리기 위한 거대한 음모를 꾸미고 있는건 아닐까? 도대체 학원에서 뭘 배우길래 '크롤링'했어요 라던지 'AI 개발했어요' 같은 말을 동네 마트에 잠깐 다녀오는 것처럼 쉽게 할 수 있는지 궁금했다. 코딩 학원 출신들이 말하는 크롤러는 그냥 어디 사이트에 Http Request 날려 본거고 AI 개발은 colab이나 github에서 다운로드 버튼을 눌렀다는 정도로 이해하면 된다. 심각한 경우 자연어 처리, 감성 분석을 해 봤다고 말하는 사람도 있었는데 이 같은 경우 상상을 초월하는 진실을 알게 될까봐 두려워서 더 묻지는 않았다.\n\
\n\
코딩 학원 수료생들은 아무래도 자신이 학원 출신이라는 딱지를 지나치게 의식하는 듯하다. 가볍게 커피를 마시는 자리에서도 비록 비전공자지만 많은걸 알고 있다는 걸 보여주고 싶어 하고 때문에 입버릇 처럼 나오는 말이 있다.\n\
\n\
👩🏻 💻 \"혹시 Deno 아세요?\"\n\
😊 \"앗, 들어는 봤습니다.\"\n\
\n\
면접이든 미팅이든 꼭 이런 단골 멘트가 나오는데 들을 때 마다 난감하다. 들어는 봤는데 뭐 어떻게 할까? 기술에 대한 깊이 있는 이해 보다는 어디서 뭘 들었는데 요즘은 이게 어떻고 저떻고 떠드는게 전부다. 바로 말문이 막혀 버리는게 다반사다.\
\n\
비전공자들은 다소 문과적(?)인 사고방식을 유지하고 있다. 예컨대 새로운 용어나 기술명에 민감하고, 기초 공부보다는 테크 뉴스나 벨로그의 '2021년 트렌드 기술' 같은 글을 찾아 다닌다. 그저 유행이 어떤 것인이 알아 둔 다음 다음에 덜 쪽팔릴 생각이 앞선다. 유행하는 용어를 미리 알고 있으면 쉽게 전문가처럼 보일 수 있는데다가 내가 진짜 이 업계에서 사람들과 함께하는 기분에 취하기도 한다. 압도적인 암기력으로 용어나 트렌드를 먼저 지배하는 문과적 사고 방식이 보일 때가 있다.\
\n\
10년차 개발자라도 node 안 써 봤으면 안 써본거고 모르면 그냥 모르는거다.\
    ",
    "media": [
        {
            "type" : "image",
            "src": "https://external-gmp1-1.xx.fbcdn.net/safe_image.php?d=AQE51pK1SFD3NrLw&w=500&h=261&url=https%3A%2F%2Fbuffer-media-uploads.s3.amazonaws.com%2F603d1748002e87660f5d2b45%2F84a266e27d97e969cc6b7531e0d2ad47396aa1d7_492c4c843af716a9747d6feb142597dcafb0095f_facebook&cfs=1&ext=jpg&_nc_eui2=AeE1rLRa8ocoxY8LH5B4B35tkXnNXA2_QsCRec1cDb9CwODUty-r6m8xdRL5ucWkqf1Zj6s5SXKHtB7kwcb4Wxi2&_nc_cb=1&_nc_hash=AQETH7YEtGESypdF"
        },
        {
            "type" : "image",
            "src": "https://scontent-gmp1-1.xx.fbcdn.net/v/t45.1600-4/cp0/q75/spS444/p526x296/121635235_23846150296580701_7176397816408581890_n.jpg?_nc_cat=100&ccb=3&_nc_sid=7e83b1&_nc_eui2=AeGcYViskOzWKQtWcw3fPx-iqdag4DYtTFyp1qDgNi1MXC0UAvJh1T-CSKmQD9sw_hahlKYsGGthFbUJd31YnWYt&_nc_ohc=m9ntNH0UK8gAX9yVU3o&_nc_ht=scontent-gmp1-1.xx&_nc_tp=31&oh=8878be6c2a3e854b214adc9b0869a720&oe=60611478"
        },
        {
            "type" : "image",
            "src": "https://scontent-gmp1-1.xx.fbcdn.net/v/t1.0-0/p180x540/154795617_3885007581565933_2236440526851354363_o.jpg?_nc_cat=103&ccb=3&_nc_sid=825194&_nc_eui2=AeEZMVQG4QDA_jzztpPSkXVkkVGAC1f1zueRUYALV_XO57DeNaxt7rPKRgyGeYDvJPoYmfZgJ2lPYFHnvSsBY5NW&_nc_ohc=txIv4Fjt56oAX-KCVJB&_nc_ht=scontent-gmp1-1.xx&tp=6&oh=bac97446bff0b43c2887b4e7a324519e&oe=60613E56"
        }
    ],
    "reply" : [
        {
            "repName" : "최원준",
            "repImage" : {
                "src" : "https://scontent-gmp1-1.xx.fbcdn.net/v/t1.0-1/cp0/p40x40/27072490_1014731738676386_7768338921933008788_n.png?_nc_cat=100&ccb=3&_nc_sid=1eb0c7&_nc_eui2=AeFj8yoNgz8PVpvfilF2A5TE9ISnXbWzOZ_0hKddtbM5n8fZXY6bXP8iAkrzKYjdeDibaGIqvYsJdJuN6UXT1ofS&_nc_ohc=TbUezjxcJAQAX8rErKf&_nc_ht=scontent-gmp1-1.xx&_nc_tp=30&oh=703e052419a432bab2df0bff83d78c83&oe=6060D1DD",
                "width" : 40,
                "height" : 40,
            },
            "content" : "경동제약",
        },
        {
            "repName": "Cookat Korea - 쿠캣 코리아",
            "repImage": {
                "src": "https://scontent-gmp1-1.xx.fbcdn.net/v/t1.0-1/cp0/p40x40/91389895_2627838387480111_6644999076238589952_n.jpg?_nc_cat=1&ccb=3&_nc_sid=1eb0c7&_nc_eui2=AeESAYw-_ShIyWnuKBO6RAwtZGvtfTdG-Clka-19N0b4KYoYBs0ybyb_n7K5sEwAOXVv_Sl6Ix2jYx3u4frlTsez&_nc_ohc=_a80juhpaK4AX8Cz8bw&_nc_ht=scontent-gmp1-1.xx&tp=27&oh=3cd2a0aba565bf79bfd663187a08912c&oe=6061DD40",
                "height": 40,
                "width": 40
            },
            "content" : "쿠캣이 뭐야? 쿠캣이 뭐긴 뭐야 쿠캣 마트지 알라리알라리야 띵띵도로롱 둥둥탁탁 뭐야 쿠캣 마트지 알라리알라리야 띵띵도로롱 둥둥탁탁 뭐야 쿠캣 마트지 알라리알라리야 띵띵도로롱 둥둥탁탁 뭐야 쿠캣 마트지 알라리알라리야 띵띵도로롱 둥둥탁탁 뭐야 쿠캣 마트지 알라리알라리야 띵띵도로롱 둥둥탁탁 뭐야 쿠캣 마트지 알라리알라리야 띵띵도로롱 둥둥탁탁 뭐야 쿠캣 마트지 알라리알라리야 띵띵도로롱 둥둥탁탁 "
        },
    ],
    "likes" : 4,
};

export default function Blog() { 
    const classes = useStyles();
    const [showReply, setShow] = useState(false);
    const [replyColor, setRepColor] = useState("");
    const [CountLike, setLike] = useState(posts.likes);
    const getReply = (e) => {
        e.preventDefault();
        setShow(preShow => !preShow);
        if(!showReply) setRepColor(preCol => "primary");
        else setRepColor(preCol => "");
        // console.log(showReply);
    }
    const like = (e) => {
        e.preventDefault();
        if(CountLike==posts.likes)
            setLike(preLike => preLike+1);
        // console.log(CountLike);
    }
    return (
      <Container maxWidth="md">
        <div>
            <div className={classes.avatar}>
                <Avatar src={posts.pageImage.src} className={classes.large}/>
                <div className={classes.userName}>{posts.pageName}</div>
            </div>
            <Divider/>
            <div className={classes.mda}>
                {posts.media.map((image) => (
                    <div className={classes.imgContain}>
                        <img src={image.src} className={classes.image} />
                    </div>
                ))}
                <div className={classes.imgContain}>
                <iframe width="100%" height="500px" src="https://www.youtube.com/embed/7j2KMMadI8M" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
            </div>
            <Divider/>
            <div>
                <IconButton className={classes.icons} onClick={getReply} color={replyColor}>
                    <MessageOutlinedIcon/>
                </IconButton>
                <IconButton className={classes.icons} onClick={like}>
                    <Badge badgeContent={CountLike} color="primary">
                        <ThumbUpAltOutlinedIcon/>
                    </Badge>
                </IconButton>
                <IconButton className={classes.icons} >
                    <ShareIcon/>    
                </IconButton>
            </div>
            <Divider/>
            {   showReply && 
                <div id="rpy">
                {posts.reply.map((rep) => (
                    <div className={classes.avatar}>
                        <Avatar src={rep.repImage} className={classes.small}/> 
                        <div className={classes.userName}>{rep.repName}</div>
                        <div className={classes.repContent}>{rep.content}</div>
                    </div>
                ))}
                <Divider/>
            </div>}
            <div className={classes.description}>
            {posts.description}
            </div>
        </div>
      </Container>
  );
}