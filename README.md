# portfolio-web

Site de portfolio de Bruno Carateú — Next.js 16 (App Router), Tailwind 4, PT/EN.

## Conteúdo

**Não edite `src/data/profile.json` à mão.** Ele é gerado a partir do perfil mestre
(repositório privado `portfolio`):

```bash
cd ../portfolio && python3 integracoes/exportar_site.py
```

O exportador só publica campos públicos (sem telefone, sem dados de mercado).

## Rotas

- `/` → redireciona para `/pt`
- `/pt`, `/en` — home: apresentação, habilidades ligadas aos projetos que as provam, experiência
- `/pt/cv`, `/en/cv` — currículo web; "Baixar PDF" usa a folha de impressão (A4)

## Desenvolvimento

```bash
npm install
npm run dev
```

Deploy: Vercel (build padrão do Next.js).
