'use client'

import React from 'react';

function HelpPage() {
    return (
        <div className="bg-[#ffe47b] min-h-screen flex flex-col items-center justify-center p-10 text-[#333333]">
            <h1 className="text-4xl font-bold mb-6">Bienvenue au Centre d&apos;Aide !</h1>
            <p className="text-lg mb-4 text-center">
                Perdu ? Confus ? Pas de panique, on est là pour vous ! Naviguer sur ce site est aussi simple que de trouver un mème de chat sur Internet.
            </p>
            <div className="bg-[#f9f6f1] p-8 rounded-md w-full max-w-2xl">
                <h2 className="text-2xl font-semibold mb-4">Comment naviguer :</h2>
                <ul className="list-disc list-inside space-y-3">
                    <li>
                        <strong>Accueil :</strong> Commencez votre aventure ici ! C&apos;est comme le salon de notre site—chaleureux, accueillant et plein de choses sympas.
                    </li>
                    <li>
                        <strong>Contact :</strong> Des questions ? Des compliments ? Des réclamations ? Envoyez-nous un message ! Promis, on le lira (un jour).
                    </li>
                    <li>
                        <strong>Boutique :</strong> Parcourez notre collection de livres. Attention : vous pourriez acheter plus que prévu !
                    </li>
                    <li>
                        <strong>Aide :</strong> Oh, vous êtes déjà ici ! Bravo pour avoir trouvé cette page. Vous êtes un pro de la navigation.
                    </li>
                </ul>
                <h2 className="text-2xl font-semibold mt-6 mb-4">Astuces Pro :</h2>
                <ul className="list-disc list-inside space-y-3">
                    <li>
                        Cliquez sur le logo en haut pour revenir à la page d&apos;accueil. C&apos;est comme un bouton de téléportation magique !
                    </li>
                    <li>
                        Utilisez la barre de recherche pour trouver des livres spécifiques. C&apos;est plus rapide que de demander à votre chien.
                    </li>
                    <li>
                        Ajoutez vos pages préférées en favoris. Croyez-nous, votre futur vous vous remerciera.
                    </li>
                </ul>
            </div>
            <p className="text-center mt-8 text-sm">
                Toujours perdu ? Essayez de rafraîchir la page ou demandez à un ami. Si tout échoue, prenez un café et réessayez. Vous pouvez le faire !
            </p>
        </div>
    );
}

export default HelpPage;
