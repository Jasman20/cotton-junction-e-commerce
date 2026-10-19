"use client";

import { useState, useEffect } from "react";
import { BasketItem, Product } from "@/types";

const BASKET_STORAGE_KEY = "cj_enquiry_basket_v1";

export function getBasketItems(): BasketItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(BASKET_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Failed to read basket from localStorage", e);
    return [];
  }
}

export function saveBasketItems(items: BasketItem[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(BASKET_STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event("cj-basket-updated"));
  } catch (e) {
    console.error("Failed to save basket to localStorage", e);
  }
}

export function addToBasket(product: Product, selectedSize: string, selectedColour?: string, quantity: number = 1) {
  const current = getBasketItems();
  const colour = selectedColour || product.colours[0] || "Standard";
  const existingIdx = current.findIndex(
    (i) => i.product.id === product.id && i.selectedSize === selectedSize && i.selectedColour === colour
  );

  if (existingIdx > -1) {
    current[existingIdx].quantity += quantity;
  } else {
    current.push({
      product,
      selectedSize,
      selectedColour: colour,
      quantity,
    });
  }

  saveBasketItems(current);
}

export function removeFromBasket(productId: string, size: string, colour: string) {
  const current = getBasketItems();
  const filtered = current.filter(
    (i) => !(i.product.id === productId && i.selectedSize === size && i.selectedColour === colour)
  );
  saveBasketItems(filtered);
}

export function updateBasketQuantity(productId: string, size: string, colour: string, delta: number) {
  const current = getBasketItems();
  const item = current.find(
    (i) => i.product.id === productId && i.selectedSize === size && i.selectedColour === colour
  );
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    removeFromBasket(productId, size, colour);
  } else {
    saveBasketItems(current);
  }
}

export function clearBasket() {
  saveBasketItems([]);
}

/**
 * React hook to subscribe to local enquiry basket changes
 */
export function useBasket() {
  const [items, setItems] = useState<BasketItem[]>([]);
  const [count, setCount] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const refresh = () => {
      const current = getBasketItems();
      setItems(current);
      setCount(current.reduce((sum, item) => sum + item.quantity, 0));
      setTotal(current.reduce((sum, item) => sum + item.product.price * item.quantity, 0));
    };

    refresh();
    window.addEventListener("cj-basket-updated", refresh);
    return () => window.removeEventListener("cj-basket-updated", refresh);
  }, []);

  return { items, count, total };
}
