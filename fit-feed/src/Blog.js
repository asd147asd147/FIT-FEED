import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import ShareIcon from '@material-ui/icons/Share';
import IconButton from '@material-ui/core/IconButton';
import MessageOutlinedIcon from '@material-ui/icons/MessageOutlined';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import Badge from '@material-ui/core/Badge';
import posts from './posts.json';

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
    },
    urlCopyTextArea: {
        position: "absolute",
        width: "0px",
        height: "0px",
        bottom: "0",
        left: "0",
        opacity: "0",
    }
}));

export default function Blog() { 
    const classes = useStyles();
    const [showReply, setShow] = useState(false);
    const [replyColor, setRepColor] = useState("");
    const [CountLike, setLike] = useState(posts.likes);
    const copyUrlRef = React.useRef();

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
    const copyUrl = (e) => {
        e.preventDefault();
        console.log("share button");
        if(!document.queryCommandSupported("copy")) {
            return alert("it's not supported.");
        }
        copyUrlRef.current.select(); 
        document.execCommand('copy'); 
        e.target.focus();
    }
    const onClicFacebook = () => {
        let sharedUrl = 'https://www.facebook.com/sharer/sharer.php?u=';
        sharedUrl = sharedUrl.concat(posts.url, '/');
        // window.open('https://www.facebook.com/sharer/sharer.php?u=https://naver.com/');
        window.open(sharedUrl);
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
                <IconButton className={classes.icons} onClick={onClicFacebook}>
                    <ShareIcon/>    
                    <form>
                        <textarea className={classes.urlCopyTextArea} ref={copyUrlRef} value={posts.url}/>
                    </form>
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