"use client"

// Deterministic pseudo-random helper to avoid hydration mismatch
const pr = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

import { useState, useEffect } from "react"
import { Heart, Star, Crown, Camera, Cat, Sparkles, Lock, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// 🖼️ THAY ẢNH Ở ĐÂY - CHỈ CẦN SỬA 6 URL DƯỚI ĐÂY!
const PHOTOS = {
  photo1: "/anh/chi1.jpg", // Ảnh chị đẹp nhất
  photo2: "/anh/chi2.jpg", // Ảnh kỷ niệm
  photo3: "/anh/chi3.jpg", // Ảnh sinh nhật
  photo4: "/anh/chi4.jpg", // Ảnh xinh đẹp
  photo5: "/anh/chi5.jpg", // Ảnh nữ hoàng
  photo6: "/anh/chi6.jpg", // Ảnh rạng rỡ
}

// Mật khẩu bí mật
const SECRET_PASSWORD = "07082001"

export default function RoseElegantCard() {
  const [cardState, setCardState] = useState<"closed" | "password" | "video" | "open">("closed")
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isVideoMuted, setIsVideoMuted] = useState(false)
  const [particles, setParticles] = useState<
    Array<{
      id: number
      x: number
      y: number
      vx: number
      vy: number
      color: string
      size: number
      life: number
      type: string
    }>
  >([])

  useEffect(() => {
    if (showCelebration) {
      const interval = setInterval(() => {
        const newParticles = Array.from({ length: 20 }, (_, i) => ({
          id: Date.now() + i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          color: [
            "from-rose-300 to-pink-400",
            "from-pink-300 to-rose-400",
            "from-rose-200 to-pink-300",
            "from-pink-200 to-rose-300",
            "from-rose-400 to-pink-500",
            "from-pink-400 to-rose-500",
          ][Math.floor(Math.random() * 6)],
          size: Math.random() * 8 + 4,
          life: 100,
          type: ["circle", "star", "heart"][Math.floor(Math.random() * 3)],
        }))

        setParticles((prev) => [...prev, ...newParticles].slice(-100))
      }, 200)

      setTimeout(() => {
        clearInterval(interval)
        setParticles([])
      }, 6000)

      return () => clearInterval(interval)
    }
  }, [showCelebration])

  const handleOpenCard = () => {
    setCardState("password")
  }

  const handlePasswordInput = (digit: string) => {
    if (password.length < 8) {
      setPassword((prev) => prev + digit)
      setPasswordError(false)
    }
  }

  const handlePasswordDelete = () => {
    setPassword((prev) => prev.slice(0, -1))
    setPasswordError(false)
  }

  const handlePasswordSubmit = () => {
    if (password === SECRET_PASSWORD) {
      setCardState("video")
      setPassword("")
    } else {
      setPasswordError(true)
      setPassword("")
      // Hiệu ứng rung
      setTimeout(() => setPasswordError(false), 1000)
    }
  }

  const handleVideoEnd = () => {
    setCardState("open")
    setShowCelebration(true)
    setTimeout(() => setShowCelebration(false), 6000)
  }

  const handleCloseCard = () => {
    setCardState("closed")
    setPassword("")
    setIsVideoPlaying(false)
  }

  // Component bàn phím số
  const NumberPad = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4 shadow-2xl border-2 border-rose-200">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <Lock className="w-16 h-16 mx-auto mb-4 text-rose-500" />
            <h3 className="text-3xl font-bold text-rose-600 mb-2">🔐 Mật Khẩu Bí Mật</h3>
            <p className="text-gray-600">Nhập mật khẩu để mở thiệp sinh nhật</p>
          </div>

          {/* Hiển thị mật khẩu */}
          <div className={`flex justify-center mb-6 ${passwordError ? "animate-shake" : ""}`}>
            <div className="flex space-x-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center text-xl font-bold ${
                    i < password.length ? "bg-rose-100 border-rose-300 text-rose-600" : "bg-gray-100 border-gray-300"
                  } ${passwordError ? "border-red-500 bg-red-100" : ""}`}
                >
                  {i < password.length ? "●" : ""}
                </div>
              ))}
            </div>
          </div>

          {passwordError && (
            <div className="text-center mb-4">
              <p className="text-red-500 font-semibold">❌ Mật khẩu không đúng!</p>
            </div>
          )}

          {/* Bàn phím số */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <Button
                key={num}
                onClick={() => handlePasswordInput(num.toString())}
                className="h-16 text-2xl font-bold bg-white hover:bg-rose-50 text-rose-600 border-2 border-rose-200 hover:border-rose-300"
              >
                {num}
              </Button>
            ))}
            <Button
              onClick={handlePasswordDelete}
              className="h-16 text-xl font-bold bg-gray-100 hover:bg-gray-200 text-gray-600 border-2 border-gray-300"
            >
              ⌫
            </Button>
            <Button
              onClick={() => handlePasswordInput("0")}
              className="h-16 text-2xl font-bold bg-white hover:bg-rose-50 text-rose-600 border-2 border-rose-200 hover:border-rose-300"
            >
              0
            </Button>
            <Button
              onClick={handlePasswordSubmit}
              disabled={password.length !== 8}
              className="h-16 text-xl font-bold bg-rose-500 hover:bg-rose-600 text-white disabled:bg-gray-300 disabled:text-gray-500"
            >
              ✓
            </Button>
          </div>

          <Button
            onClick={() => setCardState("closed")}
            variant="outline"
            className="w-full border-rose-200 text-rose-600 hover:bg-rose-50"
          >
            Quay lại
          </Button>
        </CardContent>
      </Card>
    </div>
  )

  // Component video player với hiệu ứng đẹp
  const VideoPlayer = () => (
    <div className="fixed inset-0 bg-gradient-to-br from-pink-100 via-rose-100 to-pink-200 flex items-center justify-center z-50 animate-fade-in">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          >
            <div className="w-1 h-1 bg-rose-300/40 rounded-full animate-pulse" />
          </div>
        ))}
      </div>

      {/* Floating hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-float-slow"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + Math.random() * 2}s`,
            }}
          >
            <Heart className="w-6 h-6 text-rose-300/30 fill-current" />
          </div>
        ))}
      </div>

      <div className="relative w-full h-full max-w-5xl max-h-screen p-8">
        {/* Video container với hiệu ứng */}
        <div className="relative w-full h-full bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border-4 border-rose-200 overflow-hidden animate-scale-in">
          {/* Header video */}
          <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-rose-400 to-pink-500 text-white p-6 z-10 animate-slide-down">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-3xl animate-bounce">🎬</div>
                <div>
                  <h2 className="text-2xl font-bold">Video Sinh Nhật Đặc Biệt</h2>
                  <p className="text-rose-100">Dành riêng cho chị Vân Hương yêu quý 💕</p>
                </div>
              </div>
              <Button
                onClick={() => setCardState("closed")}
                className="bg-white/20 hover:bg-white/30 text-white border-white/30 rounded-full"
                size="lg"
              >
                <X className="w-6 h-6" />
              </Button>
            </div>
          </div>

          {/* Video content area */}
          <div className="relative w-full h-full pt-24 pb-20 px-8 bg-gradient-to-br from-rose-50 to-pink-50">
            {/* Video thật */}
            <div className="relative w-full h-full rounded-2xl shadow-xl overflow-hidden animate-scale-in">
              <video className="w-full h-full object-contain" controls autoPlay muted playsInline onEnded={handleVideoEnd}>
                <source src="/anh/chi7.mp4" type="video/mp4" />
                <p className="text-center text-rose-600 p-8">Trình duyệt của bạn không hỗ trợ video này.</p>
              </video>

              {/* Decorative corners */}
              <div className="absolute top-4 left-4 text-2xl animate-bounce" style={{ animationDelay: "0.5s" }}>
                🐱
              </div>
              <div className="absolute top-4 right-4 text-2xl animate-bounce" style={{ animationDelay: "1s" }}>
                💕
              </div>
              <div className="absolute bottom-4 left-4 text-2xl animate-bounce" style={{ animationDelay: "1.5s" }}>
                🎀
              </div>
              <div className="absolute bottom-4 right-4 text-2xl animate-bounce" style={{ animationDelay: "2s" }}>
                ✨
              </div>
            </div>
          </div>

          {/* Footer với thông tin */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-pink-400 to-rose-500 text-white p-4 animate-slide-up">
            <div className="flex items-center justify-center space-x-4">
              <Cat className="w-6 h-6" />
              <span className="text-lg font-semibold">Chúc mừng sinh nhật chị Vân Hương! 🎂</span>
              <Heart className="w-6 h-6 fill-current animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated starry background */}
      <div className="absolute inset-0">
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          >
            <div className="w-1 h-1 bg-rose-300/60 rounded-full animate-pulse" />
          </div>
        ))}
      </div>

      {/* Beautiful Particle System */}
      {showCelebration && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className={`absolute animate-float-particle`}
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                animationDuration: "3s",
                animationDelay: "0s",
              }}
            >
              {particle.type === "circle" && (
                <div
                  className={`rounded-full bg-gradient-to-br ${particle.color} animate-pulse`}
                  style={{
                    width: `${particle.size}px`,
                    height: `${particle.size}px`,
                    boxShadow: `0 0 ${particle.size * 2}px currentColor`,
                  }}
                />
              )}
              {particle.type === "star" && (
                <Star
                  className={`text-rose-400 fill-current animate-spin`}
                  style={{
                    width: `${particle.size}px`,
                    height: `${particle.size}px`,
                    filter: `drop-shadow(0 0 ${particle.size}px currentColor)`,
                  }}
                />
              )}
              {particle.type === "heart" && (
                <Heart
                  className={`text-pink-400 fill-current animate-bounce`}
                  style={{
                    width: `${particle.size}px`,
                    height: `${particle.size}px`,
                    filter: `drop-shadow(0 0 ${particle.size}px currentColor)`,
                  }}
                />
              )}
            </div>
          ))}

          {/* Beautiful firework bursts */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-firework-explosion"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: "2s",
              }}
            >
              {/* Central burst */}
              <div className="absolute inset-0 w-4 h-4 bg-rose-300 rounded-full animate-ping" />

              {/* Radiating particles */}
              {Array.from({ length: 12 }).map((_, j) => (
                <div
                  key={j}
                  className="absolute w-2 h-2 bg-gradient-to-r from-rose-300 via-pink-400 to-rose-500 rounded-full animate-particle-burst"
                  style={{
                    transform: `rotate(${j * 30}deg) translateX(0px)`,
                    animationDelay: `${i * 0.8 + 0.2}s`,
                  }}
                />
              ))}
            </div>
          ))}

          {/* Sparkle shower */}
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-sparkle-fall"
              style={{
                left: `${Math.random() * 100}%`,
                top: "-10%",
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: "4s",
              }}
            >
              <div
                className="text-rose-300 animate-spin"
                style={{
                  width: `${4 + Math.random() * 8}px`,
                  height: `${4 + Math.random() * 8}px`,
                  filter: "drop-shadow(0 0 8px currentColor)",
                }}
              >
                ✨
              </div>
            </div>
          ))}

          {/* Glowing overlay */}
          <div className="absolute inset-0 bg-gradient-radial from-rose-200/10 via-pink-200/5 to-transparent animate-pulse-slow" />
        </div>
      )}

      {/* Password Input */}
      {cardState === "password" && <NumberPad />}

      {/* Video Player */}
      {cardState === "video" && <VideoPlayer />}

      {/* Card Container */}
      <div className="relative w-full max-w-7xl mx-auto">
        {cardState === "closed" ? (
          // Mặt trước thiệp
          <Card className="w-full h-[800px] shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-500 border-2 border-rose-200">
            <CardContent className="p-0 h-full relative">
              <div className="h-full bg-gradient-to-br from-pink-100 to-rose-100 relative overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=60 height=60 viewBox=0 0 60 60 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fillRule=evenodd%3E%3Cg fill=%23f43f5e fillOpacity=0.1%3E%3Ccircle cx=30 cy=30 r=4/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
                </div>

                {/* Khung ảnh với thiết kế mới */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* Khung ảnh 1 - góc trên trái */}
                  <div
                    className="absolute top-4 left-4 w-32 h-40 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border-4 border-rose-200 transform rotate-12 hover:rotate-6 transition-all duration-500 hover:scale-110"
                    style={{ zIndex: 1 }}
                  >
                    <div className="w-full h-full p-3">
                      <div className="w-full h-full rounded-xl overflow-hidden">
                        <img
                          src={PHOTOS.photo1 || "/placeholder.svg"}
                          alt="Ảnh chị đẹp nhất"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Khung ảnh 2 - góc trên phải */}
                  <div
                    className="absolute top-4 right-4 w-36 h-44 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border-4 border-rose-200 transform -rotate-12 hover:-rotate-6 transition-all duration-500 hover:scale-110"
                    style={{ zIndex: 1 }}
                  >
                    <div className="w-full h-full p-3">
                      <div className="w-full h-full rounded-xl overflow-hidden">
                        <img
                          src={PHOTOS.photo2 || "/placeholder.svg"}
                          alt="Ảnh kỷ niệm"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Khung ảnh 3 - bên trái giữa */}
                  <div
                    className="absolute bottom-32 left-2 w-28 h-36 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border-4 border-rose-200 transform rotate-45 hover:rotate-12 transition-all duration-500 hover:scale-110"
                    style={{ zIndex: 1 }}
                  >
                    <div className="w-full h-full p-3">
                      <div className="w-full h-full rounded-xl overflow-hidden">
                        <img
                          src={PHOTOS.photo3 || "/placeholder.svg"}
                          alt="Ảnh sinh nhật"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Khung ảnh 4 - bên phải giữa */}
                  <div
                    className="absolute bottom-32 right-2 w-32 h-40 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border-4 border-rose-200 transform -rotate-45 hover:-rotate-12 transition-all duration-500 hover:scale-110"
                    style={{ zIndex: 1 }}
                  >
                    <div className="w-full h-full p-3">
                      <div className="w-full h-full rounded-xl overflow-hidden">
                        <img
                          src={PHOTOS.photo4 || "/placeholder.svg"}
                          alt="Ảnh xinh đẹp"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Khung ảnh 5 - góc dưới trái */}
                  <div
                    className="absolute bottom-4 left-8 w-40 h-28 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border-4 border-rose-200 transform -rotate-12 hover:-rotate-6 transition-all duration-500 hover:scale-110"
                    style={{ zIndex: 1 }}
                  >
                    <div className="w-full h-full p-3">
                      <div className="w-full h-full rounded-xl overflow-hidden">
                        <img
                          src={PHOTOS.photo5 || "/placeholder.svg"}
                          alt="Ảnh nữ hoàng"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Khung ảnh 6 - góc dưới phải */}
                  <div
                    className="absolute bottom-4 right-8 w-36 h-44 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border-4 border-rose-200 transform rotate-12 hover:rotate-6 transition-all duration-500 hover:scale-110"
                    style={{ zIndex: 1 }}
                  >
                    <div className="w-full h-full p-3">
                      <div className="w-full h-full rounded-xl overflow-hidden">
                        <img
                          src={PHOTOS.photo6 || "/placeholder.svg"}
                          alt="Ảnh rạng rỡ"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-1/4 left-1/4 animate-bounce">
                  <Cat className="w-12 h-12 text-rose-400 drop-shadow-xl" />
                </div>
                <div className="absolute top-1/4 right-1/4 animate-bounce" style={{ animationDelay: "0.5s" }}>
                  <Camera className="w-10 h-10 text-rose-400 drop-shadow-xl" />
                </div>
                <div className="absolute top-1/3 right-1/3 animate-bounce" style={{ animationDelay: "0.7s" }}>
                  🐱
                </div>
                <div className="absolute bottom-1/4 left-1/3 animate-bounce" style={{ animationDelay: "1s" }}>
                  <Crown className="w-10 h-10 text-rose-400 drop-shadow-xl" />
                </div>

                {/* Main content */}
                <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-8">
                  <div className="mb-12 bg-white/20 backdrop-blur-sm rounded-3xl p-8 border border-rose-200">
                    <div className="text-9xl mb-8 animate-bounce">🎂</div>
                    <h1 className="text-7xl md:text-8xl font-bold mb-8 text-rose-600 drop-shadow-lg">
                      🐱 SINH NHẬT 🐱
                    </h1>
                    <div className="flex justify-center space-x-6 text-5xl mb-8">
                      {["🐱", "🐾", "💕", "🎁", "🌸", "🐈", "🎀", "✨"].map((emoji, i) => (
                        <span
                          key={i}
                          className="animate-bounce"
                          style={{
                            animationDelay: `${i * 0.2}s`,
                            animationDuration: "2s",
                          }}
                        >
                          {emoji}
                        </span>
                      ))}
                    </div>
                    <p className="text-4xl md:text-5xl font-bold mb-4 text-rose-600 drop-shadow-lg">
                      Chúc Mừng Sinh Nhật
                    </p>
                    <p className="text-5xl md:text-6xl font-bold mb-12 text-gray-700 drop-shadow-lg">Chị Vân Hương ❤️</p>
                  </div>

                  {/* Nút mở thiệp */}
                  <Button
                    onClick={handleOpenCard}
                    className="bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white text-2xl px-16 py-6 rounded-full font-bold shadow-xl transform hover:scale-110 transition-all duration-300 border-3 border-rose-200 backdrop-blur-sm animate-pulse relative z-30"
                  >
                    <Lock className="w-8 h-8 mr-4" />
                    MỞ THIỆP SINH NHẬT 🎁
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : cardState === "open" ? (
          // Bên trong thiệp
          <Card className="w-full min-h-[900px] shadow-xl overflow-hidden border-2 border-rose-200">
            <CardContent className="p-0 h-full relative">
              <div className="min-h-[900px] bg-gradient-to-br from-pink-100 to-rose-100 relative overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="w-full h-full bg-gradient-to-br from-rose-200 via-pink-200 to-rose-300"></div>
                </div>

                <div className="relative z-10 p-8">
                  {/* Header */}
                  <div className="text-center mb-12">
                    <div className="text-9xl mb-8 animate-bounce">🎂</div>
                    <h2 className="text-6xl md:text-7xl font-bold mb-6 text-rose-600">Chúc Mừng Sinh Nhật</h2>
                    <h3 className="text-5xl md:text-6xl font-bold mb-12 text-gray-700">Chị Vân Hương Xinh Đẹp!</h3>
                  </div>

                  {/* Photo Gallery Section */}
                  <div className="mb-16">
                    <h4 className="text-4xl font-bold text-center mb-12 text-rose-600">📸 Kỷ Niệm Đẹp 📸</h4>
                    <div className="relative h-[600px] mb-12">
                      {/* Khung ảnh chính - trung tâm lớn */}
                      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-80 h-96 bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border-4 border-rose-200 hover:scale-105 transition-all duration-500 z-10">
                        <div className="w-full h-full rounded-2xl overflow-hidden">
                          <img
                            src={PHOTOS.photo1 || "/placeholder.svg"}
                            alt="Ảnh chị đẹp nhất"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute -top-2 -right-2 bg-rose-400 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                          ⭐
                        </div>
                      </div>

                      {/* Khung ảnh trái trên */}
                      <div className="absolute top-4 left-8 w-48 h-60 bg-white/90 backdrop-blur-sm rounded-3xl p-4 shadow-xl border-4 border-rose-200 transform rotate-12 hover:rotate-6 hover:scale-105 transition-all duration-500">
                        <div className="w-full h-full rounded-2xl overflow-hidden">
                          <img
                            src={PHOTOS.photo2 || "/placeholder.svg"}
                            alt="Ảnh kỷ niệm"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      {/* Khung ảnh phải trên */}
                      <div className="absolute top-4 right-8 w-48 h-60 bg-white/90 backdrop-blur-sm rounded-3xl p-4 shadow-xl border-4 border-rose-200 transform -rotate-12 hover:-rotate-6 hover:scale-105 transition-all duration-500">
                        <div className="w-full h-full rounded-2xl overflow-hidden">
                          <img
                            src={PHOTOS.photo3 || "/placeholder.svg"}
                            alt="Ảnh sinh nhật"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      {/* Khung ảnh trái dưới */}
                      <div className="absolute bottom-16 left-16 w-56 h-44 bg-white/90 backdrop-blur-sm rounded-3xl p-4 shadow-xl border-4 border-rose-200 transform -rotate-8 hover:-rotate-4 hover:scale-105 transition-all duration-500">
                        <div className="w-full h-full rounded-2xl overflow-hidden">
                          <img
                            src={PHOTOS.photo4 || "/placeholder.svg"}
                            alt="Ảnh xinh đẹp"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      {/* Khung ảnh phải dưới */}
                      <div className="absolute bottom-16 right-16 w-56 h-44 bg-white/90 backdrop-blur-sm rounded-3xl p-4 shadow-xl border-4 border-rose-200 transform rotate-8 hover:rotate-4 hover:scale-105 transition-all duration-500">
                        <div className="w-full h-full rounded-2xl overflow-hidden">
                          <img
                            src={PHOTOS.photo5 || "/placeholder.svg"}
                            alt="Ảnh nữ hoàng"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      {/* Khung ảnh nhỏ trái giữa */}
                      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 w-32 h-40 bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-xl border-3 border-rose-200 rotate-45 hover:rotate-12 hover:scale-105 transition-all duration-500">
                        <div className="w-full h-full rounded-xl overflow-hidden">
                          <img
                            src={PHOTOS.photo6 || "/placeholder.svg"}
                            alt="Ảnh rạng rỡ"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      {/* Khung ảnh nhỏ phải giữa */}
                      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 w-32 h-40 bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-xl border-3 border-rose-200 -rotate-45 hover:-rotate-12 hover:scale-105 transition-all duration-500">
                        <div className="w-full h-full rounded-xl overflow-hidden">
                          <img
                            src={PHOTOS.photo1 || "/placeholder.svg"}
                            alt="Ảnh bonus"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      {/* Khung ảnh tròn nhỏ - trang trí */}
                      <div className="absolute bottom-4 left-1/3 w-24 h-24 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-xl border-3 border-rose-200 hover:scale-110 transition-all duration-500">
                        <div className="w-full h-full rounded-full overflow-hidden">
                          <img
                            src={PHOTOS.photo2 || "/placeholder.svg"}
                            alt="Ảnh tròn"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      {/* Khung ảnh tròn nhỏ - trang trí 2 */}
                      <div className="absolute bottom-4 right-1/3 w-24 h-24 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-xl border-3 border-rose-200 hover:scale-110 transition-all duration-500">
                        <div className="w-full h-full rounded-full overflow-hidden">
                          <img
                            src={PHOTOS.photo3 || "/placeholder.svg"}
                            alt="Ảnh tròn 2"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      {/* Decorative elements */}
                      <div
                        className="absolute top-2 left-1/4 text-2xl animate-bounce"
                        style={{ animationDelay: "0.5s" }}
                      >
                        🐱
                      </div>
                      <div
                        className="absolute top-2 right-1/4 text-2xl animate-bounce"
                        style={{ animationDelay: "1s" }}
                      >
                        💕
                      </div>
                      <div
                        className="absolute bottom-2 left-1/4 text-2xl animate-bounce"
                        style={{ animationDelay: "1.5s" }}
                      >
                        🎀
                      </div>
                      <div
                        className="absolute bottom-2 right-1/4 text-2xl animate-bounce"
                        style={{ animationDelay: "2s" }}
                      >
                        ✨
                      </div>
                    </div>
                  </div>

                  {/* Wishes Section */}
                  <div className="mb-12">
                    <h4 className="text-4xl font-bold text-center mb-12 text-rose-600">💝 Lời Chúc Từ Em 💝</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-10 shadow-xl border-3 border-rose-200 transform hover:scale-105 transition-all duration-300">
                        <Crown className="w-12 h-12 mx-auto mb-6 text-rose-500" />
                        <p className="text-2xl font-semibold text-gray-700 text-center leading-relaxed">
                          Chúc chị luôn xinh đẹp rạng ngời như nữ hoàng, tỏa sáng mọi lúc mọi nơi!
                        </p>
                      </div>

                      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-10 shadow-xl border-3 border-rose-200 transform hover:scale-105 transition-all duration-300">
                        <Star className="w-12 h-12 mx-auto mb-6 text-rose-500" />
                        <p className="text-2xl font-semibold text-gray-700 text-center leading-relaxed">
                          Mong tất cả ước mơ của chị đều thành hiện thực, thành công rực rỡ!
                        </p>
                      </div>

                      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-10 shadow-xl border-3 border-rose-200 transform hover:scale-105 transition-all duration-300">
                        <Heart className="w-12 h-12 mx-auto mb-6 text-rose-500 fill-current" />
                        <p className="text-2xl font-semibold text-gray-700 text-center leading-relaxed">
                          Chúc chị có một tuổi mới tràn đầy hạnh phúc, yêu thương và niềm vui!
                        </p>
                      </div>

                      <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border-3 border-blue-200 transform hover:scale-105 transition-all duration-300">
                        <Sparkles className="w-12 h-12 mx-auto mb-6 text-blue-500" />
                        <p className="text-2xl font-semibold text-blue-800 text-center leading-relaxed">
                          Chúc chị luôn khỏe mạnh, vui vẻ và gặp nhiều may mắn trong cuộc sống!
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Animated emojis */}
                  <div className="flex justify-center space-x-6 text-5xl mb-12">
                    {["🐱", "🐾", "🎀", "🎁", "💕", "🐈", "🦋", "✨"].map((emoji, i) => (
                      <span
                        key={i}
                        className="animate-bounce"
                        style={{
                          animationDelay: `${i * 0.2}s`,
                          animationDuration: "2s",
                        }}
                      >
                        {emoji}
                      </span>
                    ))}
                  </div>

                  {/* Love message */}
                  <div className="text-center mb-12">
                    <div className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-16 py-8 rounded-full shadow-xl inline-block transform hover:scale-105 transition-all duration-300 border-2 border-rose-200">
                      <p className="text-4xl font-bold flex items-center">
                        <Heart className="w-12 h-12 mr-6 fill-current animate-pulse" />
                        Em Yêu Chị Vân Hương Rất Nhiều!
                        <Heart className="w-12 h-12 ml-6 fill-current animate-pulse" />
                      </p>
                    </div>
                  </div>

                  {/* Close button */}
                  <div className="text-center">
                    <Button
                      onClick={handleCloseCard}
                      className="bg-gradient-to-r from-rose-400 to-pink-400 hover:from-rose-500 hover:to-pink-500 text-white px-16 py-6 rounded-full font-semibold shadow-lg transform hover:scale-105 transition-all duration-300 text-2xl border-2 border-rose-200"
                    >
                      Đóng Thiệp
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : null}
      </div>

      <style jsx>{`
        @keyframes float-particle {
          0% { transform: translateY(0px) rotate(0deg); opacity: 1; }
          50% { transform: translateY(-30px) rotate(180deg); opacity: 0.8; }
          100% { transform: translateY(-60px) rotate(360deg); opacity: 0; }
        }
        
        @keyframes firework-explosion {
          0% { transform: scale(0); opacity: 1; }
          50% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(2); opacity: 0; }
        }
        
        @keyframes particle-burst {
          0% { transform: rotate(var(--rotation)) translateX(0px); opacity: 1; }
          100% { transform: rotate(var(--rotation)) translateX(60px); opacity: 0; }
        }
        
        @keyframes sparkle-fall {
          0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        .animate-float-particle {
          animation: float-particle 3s ease-out infinite;
        }
        
        .animate-firework-explosion {
          animation: firework-explosion 2s ease-out;
        }
        
        .animate-particle-burst {
          animation: particle-burst 1.5s ease-out;
        }
        
        .animate-sparkle-fall {
          animation: sparkle-fall 4s linear infinite;
        }
        
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse 4s ease-in-out infinite;
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scale-in {
  from { 
    opacity: 0; 
    transform: scale(0.8); 
  }
  to { 
    opacity: 1; 
    transform: scale(1); 
  }
}

@keyframes slide-down {
  from { 
    opacity: 0; 
    transform: translateY(-50px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}

@keyframes slide-up {
  from { 
    opacity: 0; 
    transform: translateY(50px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}

@keyframes fade-in-up {
  from { 
    opacity: 0; 
    transform: translateY(30px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}

@keyframes bounce-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes float-slow {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

@keyframes pulse-gentle {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.02); }
}

@keyframes progress {
  0% { width: 0%; }
  100% { width: 35%; }
}

.animate-fade-in {
  animation: fade-in 1s ease-out;
}

.animate-scale-in {
  animation: scale-in 0.8s ease-out;
}

.animate-slide-down {
  animation: slide-down 0.6s ease-out;
}

.animate-slide-up {
  animation: slide-up 0.6s ease-out;
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out;
}

.animate-bounce-slow {
  animation: bounce-slow 3s ease-in-out infinite;
}

.animate-float-slow {
  animation: float-slow 6s ease-in-out infinite;
}

.animate-pulse-gentle {
  animation: pulse-gentle 3s ease-in-out infinite;
}

.animate-progress {
  animation: progress 2s ease-out;
}
      `}</style>
    </div>
  )
}
