import QRCode from 'qrcode';
import { nanoid } from 'nanoid';
import { supabase } from '../supabase/supabaseClient';

export const generateQRCode = async () => {
  const token = nanoid(10);

  // Enregistrer le token dans Supabase
  const { error } = await supabase.from('jury_sessions').insert([{ token }]);
  if (error) throw new Error(`Erreur d'insertion : ${error.message}`);

  // Générer le QR Code
  const url = `http://localhost:3000/auth?token=${token}`;
  return await QRCode.toDataURL(url);
};

// Fonction pour générer un QR Code et l'afficher dans la console (pour les tests)
export const generateAndLogQRCode = async () => {
  const qrData = await generateQRCode();
  console.log('QR Code généré :', qrData);
};
