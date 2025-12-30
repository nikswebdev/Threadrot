// src/services/orderService.ts - ORDER MANAGEMENT WITH SUPABASE

import { supabase } from "../lib/supabase";
import { CartItem } from "../store/slices/cartSlice";

export interface OrderData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  subtotal: number;
  discountCode?: string;
  discountAmount: number;
  shippingCost: number;
  tax: number;
  total: number;
  items: CartItem[];
}

export const orderService = {
  // Create a new order
  async createOrder(orderData: OrderData) {
    try {
      // Get current user (if logged in)
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // Create order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: user?.id || null,
          email: orderData.email,
          first_name: orderData.firstName,
          last_name: orderData.lastName,
          address: orderData.address,
          apartment: orderData.apartment || null,
          city: orderData.city,
          state: orderData.state,
          zip_code: orderData.zipCode,
          phone: orderData.phone,
          subtotal: orderData.subtotal,
          discount_code: orderData.discountCode || null,
          discount_amount: orderData.discountAmount,
          shipping_cost: orderData.shippingCost,
          tax: orderData.tax,
          total: orderData.total,
          status: "pending",
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = orderData.items.map((item) => ({
        order_id: order.id,
        product_id: item.productId,
        product_name: item.name,
        product_image: item.image,
        size: item.size,
        quantity: item.quantity,
        price: item.price,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // TODO: Update product stock
      // for (const item of orderData.items) {
      //   await supabase.rpc('decrement_stock', {
      //     product_id: item.productId,
      //     quantity: item.quantity
      //   });
      // }

      return order;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  },

  // Get user's orders
  async getUserOrders(userId?: string) {
    try {
      let query = supabase
        .from("orders")
        .select(
          `
          *,
          order_items (*)
        `
        )
        .order("created_at", { ascending: false });

      if (userId) {
        query = query.eq("user_id", userId);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  },

  // Get single order by ID
  async getOrder(orderId: string) {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select(
          `
          *,
          order_items (*)
        `
        )
        .eq("id", orderId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error fetching order:", error);
      throw error;
    }
  },

  // Update order status
  async updateOrderStatus(orderId: string, status: string) {
    try {
      const { data, error } = await supabase
        .from("orders")
        .update({ status })
        .eq("id", orderId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error updating order status:", error);
      throw error;
    }
  },

  // Get order by email (for guest checkout tracking)
  async getOrdersByEmail(email: string) {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select(
          `
          *,
          order_items (*)
        `
        )
        .eq("email", email)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error fetching orders by email:", error);
      throw error;
    }
  },
};
