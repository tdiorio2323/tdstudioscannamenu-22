'use client';

import React, { useState } from 'react';

// Tipo para los enlaces
interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
  ariaLabel: string;
}

// Configuración de enlaces
const socialLinks: SocialLink[] = [
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/luiciana_34/?hl=en',
    ariaLabel: 'Seguir en Instagram',
    icon: (
      <svg className="w-6 h-6" role="img" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
        <title>Instagram</title>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    )
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/Luicianasalas',
    ariaLabel: 'Seguir en Facebook',
    icon: (
      <svg className="w-6 h-6" role="img" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
        <title>Facebook</title>
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    )
  },
  {
    name: 'Telegram',
    url: 'https://t.me/qJFUw3I5SKg4N2U5',
    ariaLabel: 'Unirse al canal de Telegram',
    icon: (
      <svg className="w-6 h-6" role="img" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
        <title>Telegram</title>
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
      </svg>
    )
  },
  {
    name: 'OnlyFans',
    url: 'https://onlyfans.com/luicianasalas',
    ariaLabel: 'Visitar perfil de OnlyFans',
    icon: (
      <svg className="w-6 h-6" role="img" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
        <title>OnlyFans</title>
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6 13h-4v4h-4v-4H6v-2h4V7h4v4h4v2z"/>
      </svg>
    )
  },
  {
    name: 'WhatsApp',
    url: 'https://api.whatsapp.com/send?phone=50664572209&text=%F0%9F%91%8B%F0%9F%8F%BDHola%20mis%20amores%20%F0%9F%92%9A%20%0AEste%20es%20mi%20enlace%20de%20whats%20%0APara%20suscribirse%20mensualmente%20%F0%9F%93%85%20%0A%F0%9F%93%8DSolo%20debes%20enviarme%20el%20baucher%20del%20sinpe%20movil%20%F0%9F%93%9D%20%0A%20%F0%9F%93%B2%20N%C3%BAmero%20de%20sinpe%206%EF%B8%8F%E2%83%A34%EF%B8%8F%E2%83%A35%EF%B8%8F%E2%83%A37%EF%B8%8F%E2%83%A32%EF%B8%8F%E2%83%A32%EF%B8%8F%E2%83%A30%EF%B8%8F%E2%83%A39%EF%B8%8F%E2%83%A3%20%0A%20%20%20%20%2064572209%20%0AAparece%20a%20nombre%20de%20Luiciana%20Salas%20',
    ariaLabel: 'Contactar por WhatsApp',
    icon: (
      <svg className="w-6 h-6" role="img" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
        <title>WhatsApp</title>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.63z"/>
      </svg>
    )
  }
];

// Configuración del usuario
const userConfig = {
  name: 'Luiciana Salas',
  bio: 'Contenido exclusivo. Suscripción mensual y contacto directo.',
  avatar: '/avatar.jpg',
  whatsappUrl: 'https://api.whatsapp.com/send?phone=50664572209&text=%F0%9F%91%8B%F0%9F%8F%BDHola%20mis%20amores%20%F0%9F%92%9A%20%0AEste%20es%20mi%20enlace%20de%20whats%20%0APara%20suscribirse%20mensualmente%20%F0%9F%93%85%20%0A%F0%9F%93%8DSolo%20debes%20enviarme%20el%20baucher%20del%20sinpe%20movil%20%F0%9F%93%9D%20%0A%20%F0%9F%93%B2%20N%C3%BAmero%20de%20sinpe%206%EF%B8%8F%E2%83%A34%EF%B8%8F%E2%83%A35%EF%B8%8F%E2%83%A37%EF%B8%8F%E2%83%A32%EF%B8%8F%E2%83%A32%EF%B8%8F%E2%83%A30%EF%B8%8F%E2%83%A39%EF%B8%8F%E2%83%A3%20%0A%20%20%20%20%2064572209%20%0AAparece%20a%20nombre%20de%20Luiciana%20Salas%20',
  sinpeNumber: '64572209',
  accentColor: '#16A34A'
};

// Componente del icono de WhatsApp
const WhatsAppIcon = () => (
  <svg className="w-6 h-6" role="img" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
    <title>WhatsApp</title>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.63z"/>
  </svg>
);

// Componente Toast
const Toast: React.FC<{ show: boolean; message: string }> = ({ show, message }) => (
  <div
    className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-6 py-3 rounded-lg font-semibold shadow-lg z-50 transition-all duration-300 ease-in-out ${
      show ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'
    }`}
  >
    {message}
  </div>
);

// Componente Hero Section
const HeroSection: React.FC = () => (
  <header className="text-center mb-8">
    <img
      src={userConfig.avatar}
      alt={`Foto de perfil de ${userConfig.name}`}
      className="w-30 h-30 rounded-full mx-auto mb-6 border-4 border-green-600 object-cover shadow-lg"
    />
    <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900 dark:text-gray-100">
      {userConfig.name}
    </h1>
    <p className="text-base text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
      {userConfig.bio}
    </p>

    {/* CTA Principal */}
    <a
      href={userConfig.whatsappUrl}
      className="inline-flex items-center justify-center gap-3 w-full bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 ease-in-out hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 shadow-md hover:shadow-lg min-h-[56px]"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Suscribirse por WhatsApp"
    >
      <WhatsAppIcon />
      Suscríbete por WhatsApp
    </a>
  </header>
);

// Componente Link Button
const LinkButton: React.FC<{ link: SocialLink }> = ({ link }) => (
  <a
    href={link.url}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={link.ariaLabel}
    className="inline-flex items-center justify-center gap-3 w-full bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 active:bg-gray-200 dark:active:bg-gray-600 text-gray-900 dark:text-gray-100 font-semibold py-4 px-6 rounded-xl transition-all duration-200 ease-in-out hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md min-h-[56px]"
  >
    {link.icon}
    {link.name}
  </a>
);

// Componente Enlaces Section
const LinksSection: React.FC = () => (
  <section className="mb-8">
    <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
      Enlaces
    </h2>
    <div className="flex flex-col gap-3">
      {socialLinks.map((link) => (
        <LinkButton key={link.name} link={link} />
      ))}
    </div>
  </section>
);

// Componente SINPE Card
const SinpeCard: React.FC = () => {
  const [showToast, setShowToast] = useState(false);

  const copyToClipboard = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(userConfig.sinpeNumber);
      } else {
        // Fallback para navegadores que no soportan la API moderna
        const textArea = document.createElement('textarea');
        textArea.value = userConfig.sinpeNumber;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }

      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  return (
    <>
      <section className="mb-8">
        <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Pago SINPE Móvil
          </h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Número SINPE:
              </p>
              <p className="text-lg font-bold text-green-600 font-mono">
                {userConfig.sinpeNumber}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                A nombre de {userConfig.name}
              </p>
            </div>
            <button
              onClick={copyToClipboard}
              className="bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 text-sm"
              aria-label="Copiar número SINPE"
            >
              Copiar
            </button>
          </div>
        </div>
      </section>

      <Toast show={showToast} message="¡Número copiado!" />
    </>
  );
};

// Componente Footer
const Footer: React.FC = () => (
  <footer className="text-center pt-8 border-t border-gray-200 dark:border-gray-700 mt-8">
    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
      🔞 Contenido para mayores de 18 años
    </p>
    <p className="text-sm text-gray-600 dark:text-gray-400">
      Tu privacidad es importante para nosotros
    </p>
  </footer>
);

// Componente principal
export default function LinkPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-md mx-auto px-4 py-6 min-h-screen flex flex-col">
        <div className="flex-1">
          <HeroSection />
          <main>
            <LinksSection />
            <SinpeCard />
          </main>
        </div>
        <Footer />
      </div>
    </div>
  );
}