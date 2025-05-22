import { Request as Req, Response } from "express";
import { AppDataSource } from "../db";
import { AccessRequest } from "../entities/AccessRequest";
import { Software } from "../entities/Software";
import { User } from "../entities/User";

const requestRepo = AppDataSource.getRepository(AccessRequest);
const softwareRepo = AppDataSource.getRepository(Software);
const userRepo = AppDataSource.getRepository(User);

export const submitRequest = async (req: Req, res: Response): Promise<any> => {
  const { softwareId, accessType, reason } = req.body;
  const userId = (req as any).user.id;

  try {
    const software = await softwareRepo.findOneBy({ id: softwareId });
    const user = await userRepo.findOneBy({ id: userId });

    if (!software || !user) {
      return res.status(404).json({ message: "Software or User not found" });
    }

    const newRequest = requestRepo.create({
      software,
      user,
      accessType,
      reason,
      status: 'Pending',
    });

    await requestRepo.save(newRequest);
    res.status(201).json({ message: "Request submitted", newRequest });
  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
};

// Get all pending requests (for managers)
export const getPendingRequests = async (req: Req, res: Response): Promise<any> => {
  try {
    const requests = await requestRepo.find({
      where: { status: "Pending" },
      relations: ["user", "software"],
    });
    res.status(200).json(requests);
  } catch (err: unknown) {
  if (err instanceof Error) {
    // console.error("Error fetching pending requests:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  } else {
    // console.error("Unknown error:", err);
    res.status(500).json({ message: "Unknown error", error: String(err) });
  }
}
};


// Approve or Reject a request by ID
export const updateRequestStatus = async (req: Req, res: Response): Promise<any> => {
  const requestId = parseInt(req.params.id);
  const { status } = req.body;

  if (!["Approved", "Rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const request = await requestRepo.findOneBy({ id: requestId });

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    request.status = status as "Approved" | "Rejected";
    await requestRepo.save(request);
    res.status(200).json({ message: `Request ${status}`, request });
  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
};
