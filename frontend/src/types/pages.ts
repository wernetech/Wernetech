// Tipos reutilizáveis para rotas dinâmicas

export type SlugPageProps = {
  params: {
    slug: string;
  };
};

export type IdPageProps = {
  params: {
    id: string;
  };
};

export type TagPageProps = {
  params: {
    tag: string;
  };
};
