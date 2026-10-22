'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from '../page.module.css';

const images = [
    '/basile2.jpg',
    '/calebe.jpeg',
    '/bruno.jpeg',
];

export default function Call() {
    const [imagem, setImagem] = useState('/buzz.jpg');
    const [tocando, setTocando] = useState(false);
    const audioRef = useRef(null);
    useEffect(() => {
    const randomIndex = Math.floor(Math.random() * images.length);
    setImagem(images[randomIndex]);
}, []);

    function imagemAleatoria() {
        const outrasImagens = images.filter(
            (img) => img !== imagem
        );

        const pool = outrasImagens.length > 0
            ? outrasImagens
            : images;

        return pool[Math.floor(Math.random() * pool.length)];
    }

    async function tocarMusica() {
        const audio = audioRef.current;
        if (!audio) return;

        try {
            await audio.play();
            setTocando(true);
        } catch (erro) {
            console.log(
                'Não foi possível reproduzir a música.',
                erro
            );
            setTocando(false);
        }
    }

    function pararMusica() {
        const audio = audioRef.current;
        if (!audio) return;

        audio.pause();
        audio.currentTime = 0;
        setTocando(false);
    }

    function aceitarLigacao() {
        pararMusica();
    }

    function recusarLigacao() {
        pararMusica();
        setImagem('/images.jpg');
    }

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.currentTime = 0;

        audio.play()
            .then(() => setTocando(true))
            .catch(() => {
                setTocando(false);
            });

        return () => {
            audio.pause();
            audio.currentTime = 0;
        };
    }, []);

    return (
        <div className={styles.page}>
            <div className={styles.phone}>
                <Image
                    className={styles.logo}
                    src={imagem}
                    alt="Buzz is calling"
                    fill
                    priority
                />

                <audio
                    ref={audioRef}
                    src="/musica.mp3"
                    loop
                    preload="auto"
                />

                <button
                    className={styles.botaoMusica}
                    onClick={() => {
                        if (tocando) {
                            pararMusica();
                        } else {
                            tocarMusica();
                        }
                    }}
                    aria-label={
                        tocando ? 'Pausar música' : 'Tocar música'
                    }
                >
                    {tocando ? '⏸' : '♫'}
                </button>

                <div className={styles.botoes}>
                    <button
                        className={`${styles.botao} ${styles.recusar}`}
                        onClick={recusarLigacao}
                        aria-label="Recusar ligação"
                    >
                        ✕
                    </button>

                    <button
                        className={`${styles.botao} ${styles.aceitar}`}
                        onClick={aceitarLigacao}
                        aria-label="Aceitar ligação"
                    >
                        ☎
                    </button>
                </div>
            </div>
        </div>
    );
}