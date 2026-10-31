
"use client";

import { useState } from "react";
import { Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { authClient } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const categories = [
  "Beach",
  "Mountain",
  "Cultural",
  "Adventure",
  "City Break",
  "Cruise",
];

const fieldClass =
  "h-11 border-transparent bg-[#f7f9fb] focus-visible:border-ring focus-visible:ring-ring/40";

const selectTriggerClass =
  "w-full border-transparent bg-[#f7f9fb] focus-visible:border-ring focus-visible:ring-ring/40 data-[size=default]:h-11";

export default function AddDestinationPage() {
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    category: "Beach",
    price: "",
    duration: "",
    departureDate: "",
    imageUrl: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    
  const token = await getTokenFromClient()



    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-destination`,{
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
    })

    const result = await res.json();
    console.log(result);
    // console.log(formData);
  };

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-12">
      <Card className="mx-auto max-w-3xl py-10 shadow-md md:px-12">
        <CardContent className="px-0">
          <form
            className="flex flex-col gap-7"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-2">
              <Label className="font-semibold text-gray-900">
                Destination Name
              </Label>

              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Bali Paradise"
                className={fieldClass}
              />
            </div>

            <div className="grid gap-7 md:grid-cols-2 md:gap-x-16">
              <div className="flex flex-col gap-2">
                <Label className="font-semibold text-gray-900">
                  Country
                </Label>

                <Input
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Indonesia"
                  className={fieldClass}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label className="font-semibold text-gray-900">
                  Category
                </Label>

                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      category: value ?? "Beach",
                    })
                  }
                >
                  <SelectTrigger
                    size="default"
                    className={selectTriggerClass}
                  >
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>

                  <SelectContent>
                    {categories.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <Label className="font-semibold text-gray-900">
                  Price (USD)
                </Label>

                <Input
                  name="price"
                  type="number"
                  min="0"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e.g., 1299"
                  className={fieldClass}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label className="font-semibold text-gray-900">
                  Duration
                </Label>

                <Input
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="e.g., 7 Days/6 Nights"
                  className={fieldClass}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label className="font-semibold text-gray-900">
                  Departure Date
                </Label>

                <Input
                  name="departureDate"
                  type="date"
                  value={formData.departureDate}
                  onChange={handleChange}
                  className={fieldClass}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label className="font-semibold text-gray-900">
                  Image URL
                </Label>

                <Input
                  name="imageUrl"
                  type="url"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className={fieldClass}
                />
              </div>

              <div className="md:col-span-2">
                <div className="flex flex-col gap-2">
                  <Label className="font-semibold text-gray-900">
                    Description
                  </Label>

                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe the travel experience..."
                    className="min-h-44 border-transparent bg-[#f7f9fb] focus-visible:border-ring focus-visible:ring-ring/40"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-end gap-5">
              <Button
                type="button"
                variant="outline"
                className="border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700"
              >
                <Trash2 className="size-4" />
                Cancel
              </Button>

              <Button
                type="submit"
                className="bg-[#29b1d4] text-white hover:bg-[#239dbd]"
              >
                <Save className="size-4" />
                Add Travel Package
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
