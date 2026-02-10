import { ApiHandler } from "../../../lib/api-handler";
import { characterRepository } from "../../../lib/repository";

export async function OPTIONS() {
  return ApiHandler.cors();
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const sortBy = searchParams.get('sortBy') || 'name';
    const sortOrder = searchParams.get('sortOrder') as 'asc' | 'desc' || 'asc';
    
    const search = searchParams.get('search');
    const game = searchParams.get('game');
    const rarity = searchParams.get('rarity');
    const attribute = searchParams.get('attribute');

    let filters: any = {};
    
    if (search) {
      const searchResult = await characterRepository.search(search, {
        page,
        limit,
        sortBy,
        sortOrder
      });
      return ApiHandler.withCorsHeaders(
        ApiHandler.success(
          searchResult.data,
          undefined,
          searchResult.pagination
        )
      );
    }

    if (game) {
      filters.game = game;
    }
    
    if (rarity) {
      filters.rarity = rarity;
    }
    
    if (attribute) {
      filters.attribute = attribute;
    }

    const result = await characterRepository.findWithFilters(filters, {
      page,
      limit,
      sortBy,
      sortOrder,
      select: {
        id: true,
        name: true,
        imageUrl: true,
        tag: true,
        slug: true,
        attribute: true,
        race: true,
        rarity: true,
        game: true,
        Crossover: true,
        collection: true
      }
    });

    const formattedCharacters = result.data.map((char: any) => ({
      id: char.id,
      name: char.name,
      imageUrl: char.imageUrl,
      tag: char.tag,
      slug: char.slug,
      attribute: char.attribute,
      race: char.race,
      rarity: char.rarity,
      game: char.game,
      crossover: char.Crossover,
      collection: char.collection
    }));

    const response = ApiHandler.success(
      formattedCharacters,
      undefined,
      result.pagination
    );

    return ApiHandler.withCorsHeaders(response);
  } catch (err) {
    console.error("Error fetching characters", err);
    return ApiHandler.withCorsHeaders(
      ApiHandler.serverError("Failed to fetch characters", err)
    );
  }
}