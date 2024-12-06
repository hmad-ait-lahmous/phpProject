<?php
namespace App\Libraries;

use CodeIgniter\Files\File;

class UploadHandler
{
    protected $uploadPath;

    public function __construct()
    {
        // Chemin vers le dossier où les fichiers seront téléchargés
        $this->uploadPath = ROOTPATH . 'public/uploads/';

        // Créer le dossier s'il n'existe pas
        if (!is_dir($this->uploadPath)) {
            mkdir($this->uploadPath, 0777, true);
        }
    }

    public function uploadFile($file)
    {
        // Vérifier si le fichier est valide
        if ($file->isValid() && !$file->hasMoved()) {
            // Générer un nom unique pour le fichier
            $newName = $file->getRandomName();

            // Déplacer le fichier dans le dossier de destination
            if ($file->move($this->uploadPath, $newName)) {
                return $newName; // Retourne le nom du fichier une fois l'upload réussi
            } else {
                // Si l'upload échoue
                throw new \RuntimeException('Échec du téléchargement du fichier');
            }
        } else {
            // Si le fichier n'est pas valide ou déjà déplacé
            throw new \RuntimeException('Le fichier n\'est pas valide ou a déjà été déplacé');
        }
    }
}