FROM node:14
ENV API_END_POINT=https://tsmart-api-core.herokuapp.com/api \
    APP_NAME=tSmart \    
    ADDRESS=jf jyf jyfhukjyrf kyjhf vkujyfh \
    CLOUDINARY_API_KEY=115694213661119 \
    CLOUDINARY_API_SECRET=NzrczDJy3QijdLcqHK73pBMmUMs \
    CLOUDINARY_NAME=dujmxefu3 \
    EMAIL=noreply.searchingyard@gmail.com \
    EMAIL_PASSWORD=cgh@2022 \
    EMAIL_SERVICE_PASSWORD=cjdncebtjltveooo \
    FIREBASE_SERVER_KEY=AAAAA9dXtEA:APA91bHyqmer9rTT-VWloTwFmpDQjeWhZrW4nSiQ8kPw4NynMFdRgHUaRsHP3sFAFNDEKUgWYtbyKhtj91-AmiSFatRl7U59zJn_kGyEg2g_ZL3uAmHNavnWBIt9OoyF57Hy64Si_rs8 \
    JWT_ACCESS_SECRET=gu6thr65dr6u576fnu7iy \
    JWT_REFRESH_SECRET=yf7uytnfcvyjtrduyvytn \
    MONGODB_URI=mongodb+srv://noreplytsmartuk:6xmJJRHaiAwMbfJr@cluster0.fzapdlb.mongodb.net/tsmart?retryWrites=true&w=majority \
    WEBSITE_END_POINT=https://tsmart-uk.vercel.app/ \
    LOGO_URL=https://res.cloudinary.com/dujmxefu3/image/upload/v1664521190/samples/tsmart/assets/tsmart_xmzlif.webp \
    WHITE_LOGO_URL=https://res.cloudinary.com/dujmxefu3/image/upload/v1664521190/samples/tsmart/assets/tsmart_xmzlif.webp \
    LINKEDIN_URL=https://res.cloudinary.com/lalit-sekhar/image/upload/v1661159808/CGH/assets/WhatsApp_Image_2022-08-22_at_1.02.15_PM_3_xqp69a.jpg \
    LINKEDIN2_URL=https://res.cloudinary.com/lalit-sekhar/image/upload/v1661159808/CGH/assets/WhatsApp_Image_2022-08-22_at_1.02.15_PM_4_p2t6fd.jpg \
    INSTAGRAM_URL=https://res.cloudinary.com/lalit-sekhar/image/upload/v1661159808/CGH/assets/WhatsApp_Image_2022-08-22_at_1.02.15_PM_1_pulero.jpg \
    INSTAGRAM2_URL=https://res.cloudinary.com/lalit-sekhar/image/upload/v1661159808/CGH/assets/WhatsApp_Image_2022-08-22_at_1.02.15_PM_2_exfani.jpg \
    FACEBOOK_URL=https://res.cloudinary.com/lalit-sekhar/image/upload/v1661159809/CGH/assets/WhatsApp_Image_2022-08-22_at_1.02.15_PM_jqpons.jpg \
    TWITTER_URL=https://res.cloudinary.com/lalit-sekhar/image/upload/v1661159809/CGH/assets/WhatsApp_Image_2022-08-22_at_1.02.15_PM_7_rk9zf8.jpg \
    TWITTER2_URL=https://res.cloudinary.com/lalit-sekhar/image/upload/v1661159809/CGH/assets/WhatsApp_Image_2022-08-22_at_1.02.15_PM_8_fl8ql1.jpg \
    WIFI_URL=https://res.cloudinary.com/lalit-sekhar/image/upload/v1661159809/CGH/assets/WhatsApp_Image_2022-08-22_at_1.02.15_PM_9_rl82sv.jpg \
    WIFI2_URL=https://res.cloudinary.com/lalit-sekhar/image/upload/v1661159809/CGH/assets/WhatsApp_Image_2022-08-22_at_1.02.15_PM_10_apxhkz.jpg \
    STRIPE_KEY=sk_test_51JPY2RC8D8ZP3ZHNPkGp85Wa1w4ZZjcGV2cHydNJ9Hhy3AOazPdl8lrcfkfKpNqY8xvq7o3Q2506u6d0ifSsP84100JqBIiuuT \
WORKDIR /app
COPY package.json .
RUN npm install
COPY . ./
EXPOSE 8000
RUN npm run build
CMD [ "npm", "start" ]