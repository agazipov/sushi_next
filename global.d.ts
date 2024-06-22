// global.d.ts

interface Window {
    ym: (counterId: number, hitType: string, url: string) => void;
}