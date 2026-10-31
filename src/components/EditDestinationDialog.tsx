'use client'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { SquarePen } from "lucide-react";
import { Save, Trash2 } from "lucide-react";
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
import { useState } from "react";
import { IApiData } from "@/lib/apiData";
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



const EditDestinationDialog = ({apiData}: {apiData: IApiData}) => {
    // console.log("apiDAAATAA:",apiData);

    const [formData, setFormData] = useState(
        apiData
    //     {
    //     name: "",
    //     country: "",
    //     category: "Beach",
    //     price: "",
    //     duration: "",
    //     departureDate: "",
    //     imageUrl: "",
    //     description: "",
    //   }
    );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      
    });
    
  };

//  console.log('aaaaaaaaaa',formData);
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {_id, ...updatedData} = formData
   const token = await getTokenFromClient()
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destination/${apiData._id}`,{
        method: "PATCH",
        headers: {
            "Content-Type" : "application/json",
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updatedData)
    })

    const data = await res.json();
    console.log(data);
    // console.log(formData);
  };

    return (
        <Dialog>
            <DialogTrigger>
                <Button
            variant="outline"
            className="border-gray-300 text-gray-800 hover:text-gray-900"
          >
            <SquarePen className="size-4" />
            Edit
          </Button>
            </DialogTrigger>
            <DialogContent className={'min-w-xl'}>
                <DialogHeader>
                    <DialogTitle>Edit Destination</DialogTitle>
                    <DialogDescription>
          <form
            className="flex flex-col gap-4 "
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

            <div className="grid gap-4 md:grid-cols-2 md:gap-x-16">
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
                    className="min-h-10 border-transparent bg-[#f7f9fb] focus-visible:border-ring focus-visible:ring-ring/40"
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
                Update Travel Package
              </Button>
            </div>
          </form>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default EditDestinationDialog;