'use client';

import { useState, useRef, useEffect } from 'react';
import Image from "next/image";
import styles from "../page.module.css";

export default function Call(){
    const [imagem, setImagem] = useState('/buzz.jpg');
    const [tocando, setTocando] = useState(false);
    const audioRef = useRef(null);

    async function tocarMusica() {
        if (!audioRef.current) return;

        try {
        await audioRef.current.play();
        setTocando(true);
        } catch (erro) {
        console.log('Não foi possível reproduzir a música.');
        }
    }

    function pararMusica(novaImagem) {
        audioRef.current?.pause();
        setTocando(false);
        setImagem(novaImagem);
    }

    useEffect(() => {
        audioRef.current.play().catch(() => {
        // O navegador pode bloquear a reprodução automática.
        });
    }, []);

    function aceitarLigacao() {
        audioRef.current.pause();
        setImagem('/buzz.jpg');
    }

    function recusarLigacao() {
        audioRef.current.pause();
        setImagem('/images.jpg');
    }
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
                    src="musica.mp3"
                    loop
                />

                <button
                    className={styles.botaoMusica}
                    onClick={tocando
                    ? () => {
                        audioRef.current.pause();
                        setTocando(false);
                        }
                    : tocarMusica}
                    aria-label={tocando ? 'Pausar música' : 'Tocar música'}
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