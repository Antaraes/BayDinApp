"use client";
import { FC } from "react";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";
interface LayoutProps {}

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Card className=" overflow-hidden w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <Typography variant="h5" color="blue-gray">
                မင်းသိင်္ခ / လက်ထောက်ဗေဒင်
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                သိလိုသော မေးခွန်းအား ရှာဖွေပါ...
              </Typography>
            </div>
          </div>
        </CardHeader>
      </Card>
      {children}
    </>
  );
};

export default Layout;
