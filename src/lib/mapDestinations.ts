
export type Destination = {
  name: string;
  location: string;
  price: number;
  duration: string;
  category: string;
  rating: number;
  imageUrl: string;
  _id: string;
};

const FALLBACK_IMAGES = [
  "/images/destinations/image1.png",
  "/images/destinations/image2.png",
  "/images/destinations/image3.png",
  "/images/destinations/image4.png",
  "/images/destinations/image5.png",
  "/images/destinations/image6.png",
];

function readString(
  source: Record<string, unknown>,
  keys: string[],
  fallback: string
): string {
  for (const key of keys) {
    const value = source[key];

    if (typeof value === "string" && value.length > 0) {
      return value;
    }

    if (typeof value === "number") {
      return String(value);
    }
  }

  return fallback;
}

function readNumber(
  source: Record<string, unknown>,
  keys: string[],
  fallback: number
): number {
  for (const key of keys) {
    const value = source[key];

    if (typeof value === "number" && Number.isFinite(value)) {
      return value;
    }

    if (
      typeof value === "string" &&
      value.trim() !== "" &&
      !Number.isNaN(Number(value))
    ) {
      return Number(value);
    }
  }

  return fallback;
}

export function mapDestinations(rawList: unknown[]): Destination[] {
  return rawList.map((raw, index) => {
    const item = (raw ?? {}) as Record<string, unknown>;

    const fallbackImage =
      FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];

    return {
      name: readString(item, ["name", "title"], `Destination ${index + 1}`),
      location: readString(item, ["location", "country"], "Unknown"),
      price: readNumber(item, ["price", "cost"], 0),
      duration: readString(item, ["duration", "days"], "—"),
      category: readString(item, ["category", "type"], "Other"),
      rating: readNumber(item, ["rating", "score"], 4.5),
      imageUrl: readString(
        item,
        ["image", "image_url", "imageUrl", "img"],
        fallbackImage
      ),
      _id: readString(item, ["_id", "id"], `destination-${index}`),
    };
  });
}
