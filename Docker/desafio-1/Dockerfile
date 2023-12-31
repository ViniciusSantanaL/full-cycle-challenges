FROM golang:alpine as builder

WORKDIR /usr/src/app

COPY hello.go .

RUN go build -o /app hello.go 

FROM scratch

COPY --from=builder /app /app

CMD ["/app"]


