import { Document } from "mongoose";

import { IPersonCard } from "./person-card.interface";

export interface IPersonCardDb extends Document, IPersonCard {
}