# node镜像仅仅是用来打包文件
FROM node:16.0.0 as builder

WORKDIR /app
COPY . /app
RUN ls -al
RUN npm config set registry https://registry.npmmirror.com
RUN npm i -g pnpm
RUN pnpm install
RUN pnpm build

# 选择更小体积的基础镜像
FROM nginx:alpine
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /app/build
EXPOSE 80
# 启动nginx，关闭守护式运行，否则容器启动后会立刻关闭
CMD ["nginx", "-g", "daemon off;"]
