import argparse
import os
import errno
from facebook import facebook
from instagram import instagram

#python3 main.py --service facebook --usercode af323 --id myId --pw myPw
if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Get facebook,instagram data\n ')

    parser.add_argument('--service', required=True, help='facebook/instagram/instagram_use_facebook')
    parser.add_argument('--usercode', required=True, help='FIT-Feed에서 사용하는 유저 식별 code')
    parser.add_argument('--id', required=True, help='id: email or phone number')
    parser.add_argument('--pw', required=True, help='pw')

    args = parser.parse_args()

    if not os.path.exists('userData'):
        try:
            os.makedirs('userData')
        except OSError as exc: # Guard against race condition
            if exc.errno != errno.EEXIST:
                raise
    
    userDataDir = 'userData\\'+args.usercode
    
    if not os.path.exists(userDataDir):
        try:
            os.makedirs(os.path.dirname(userDataDir))
        except OSError as exc: # Guard against race condition
            if exc.errno != errno.EEXIST:
                raise

    if args.service == 'facebook':
        facebook(args.id, args.pw, userDataDir)
    elif args.service == 'instagram':
        instagram(args.id,args.pw, userDataDir)
    elif args.service == 'instagram_use_facebook':
        instagram(args.id,args.pw, userDataDir, True)
    else :
        raise EnvironmentError