"use client"

import emitter from "@/lib/utils/global.emitter";
import CE_Autocomplete from "@/lib/ui/autocomplete";
import CE_Button from "@/lib/ui/button"
import CE_Card from "@/lib/ui/card";
import CE_Checkbox from "@/lib/ui/checkbox";
import CE_Dropdown from "@/lib/ui/dropdown";
import CE_Input from "@/lib/ui/input";
import CE_DatePicker from "@/lib/ui/input.date";
import CE_Loading from "@/lib/ui/loading";
import CE_ModalConfirmation from "@/lib/ui/modal.confirmation";
import CE_ModalInfo from "@/lib/ui/modal.info";
import CE_RadioGroup from "@/lib/ui/radio";
import { useState } from "react";

export default function CE_HomeMain(){
    const [isModalOpen, setModalOpen] = useState(false)
    const [isModalConfirmOpen, setModalConfirmOpen] = useState(false)
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [birthdate, setBirthdate] = useState<Date | null>(null)
    const [selectedGender, setSelectedGender] = useState("")
    const [singleCountry, setSingleCountry] = useState<string>("")
    const [multiCountries, setMultiCountries] = useState<string[]>([])

    const countryOptions = [
        { label: "Indonesia", value: "id" },
        { label: "Malaysia", value: "my" },
        { label: "Singapore", value: "sg" },
        { label: "Thailand", value: "th" },
        { label: "Vietnam", value: "vn" },
        { label: "Philippines", value: "ph" },
        { label: "Japan", value: "jp" },
    ]

    const doOpenToast = (type: boolean) => {
        emitter.emit("toast", {
            success: type,
            label: "Open toast success!",
            autoclose: true,
            autoclosetime: 5,
        })
    }

    return (
        <>
            <div className="flex flex-col w-full min-h-screen p-6 items-center justify-center">
                <div className="text-primary font-bold text-3xl">UI Component</div>

                <div className="flex flex-col gap-2 mt-4 border-b-2 w-1/2 pb-4 items-center">
                    Card, Modal, Button, & Toast
                    <CE_Card bgColor="bg-muted">
                        <div className="flex flex-row gap-2">
                            <CE_Button label="Toast Success" color="primary" disable={false} onClick={() => doOpenToast(true)}/>
                            <CE_Button label="Toast Error" color="secondary" disable={false} onClick={() => doOpenToast(false)}/>
                            <CE_Button label="Open Modal Info" color="primary" disable={false} onClick={() => setModalOpen(true)}/>
                            <CE_Button label="Open Modal Confirm" color="secondary" disable={false} onClick={() => setModalConfirmOpen(true)}/>
                        </div>
                    </CE_Card>
                </div>

                <div className="flex flex-col gap-2 mt-4 border-b-2 w-1/2 pb-4 items-center">
                    Radio Button
                    <CE_RadioGroup
                        options={[
                            { label: "Male", value: "male" },
                            { label: "Female", value: "female" },
                            { label: "Other", value: "other" },
                        ]}
                        defaultValue="male"
                        onChange={(val) => {
                            emitter.emit("toast", {
                                success: true,
                                label: "On Change Radio Value: " + val,
                                autoclose: true,
                                autoclosetime: 5,
                            })
                        }}
                    />
                </div>
                <div className="flex flex-col gap-2 mt-4 border-b-2 w-1/2 pb-4 items-center">
                    Checkbox
                    <CE_Checkbox label="Square Checkbox" shape="square" onChecked={(checked) => {
                        emitter.emit("toast", {
                            success: checked,
                            label: "On Checked Square: " + checked,
                            autoclose: true,
                            autoclosetime: 5,
                        })
                    }} />
                    <CE_Checkbox label="Rounded Checkbox" shape="rounded" onChecked={(checked) => {
                        emitter.emit("toast", {
                            success: checked,
                            label: "On Checked Rounded: " + checked,
                            autoclose: true,
                            autoclosetime: 5,
                        })
                    }} />
                    <CE_Checkbox label="Circle Checkbox" shape="circle" onChecked={(checked) => {
                        emitter.emit("toast", {
                            success: checked,
                            label: "On Checked Circle: " + checked,
                            autoclose: true,
                            autoclosetime: 5,
                        })
                    }} />
                </div>
                <div className="flex flex-col gap-2 mt-4 border-b-2 w-1/2 pb-4 items-center">
                    Dropdown
                    <CE_Dropdown
                        label="Date of Birth"
                        options={[
                            { label: "Male", value: "male" },
                            { label: "Female", value: "female" },
                            { label: "Other", value: "other" },
                        ]}
                        value={selectedGender}
                        placeholder="Select gender"
                        onChange={(val) => setSelectedGender(val)}
                        className="w-1/2"
                    />

                    <CE_Autocomplete
                        label="Select Country (Single)"
                        options={countryOptions}
                        value={singleCountry}
                        onChange={(val) => setSingleCountry(val as string)}
                        className="w-64"
                    />

                    <CE_Autocomplete
                        label="Select Countries (Multiple)"
                        options={countryOptions}
                        value={multiCountries}
                        multiple
                        onChange={(val) => setMultiCountries(val as string[])}
                        className="w-96"
                    />
                </div>
                <div className="flex flex-col gap-2 mt-4 border-b-2 w-1/2 pb-4 items-center">
                    Input
                    <CE_Input
                        label="Name"
                        type="text"
                        value={name}
                        placeholder="Enter your name"
                        onInput={(val) => setName(val)}
                        onEnter={() => {
                                emitter.emit("toast", {
                                success: true,
                                label: "On Enter Input Name: " + name,
                                autoclose: true,
                                autoclosetime: 5,
                            })}
                        }
                    />
                    <CE_Input
                        label="Phone Number"
                        type="number"
                        value={phone}
                        placeholder="Enter your name"
                        onInput={(val) => setPhone(val)}
                        onEnter={() => {
                            emitter.emit("toast", {
                                success: true,
                                label: "On Enter Phone Number: " + phone,
                                autoclose: true,
                                autoclosetime: 5,
                            })}
                        }
                    />
                    <CE_DatePicker 
                        label={"Date of Birth"} 
                        value={birthdate} 
                        onChange={(date) => {
                            setBirthdate(date)
                        }}                    
                    />
                </div>
                <div className="flex flex-col gap-2 mt-4 border-b-2 w-1/2 pb-4 items-center">
                    Loading
                    <CE_Loading color="primary" label="Please Wait... " className="mb-2"/>
                    <CE_Loading color="secondary" label="Please Wait... "/>
                    <CE_Button label="Toast Success" loading={true} loadingText="Loading on Button"/>
                </div>
            </div>
            <CE_ModalInfo 
                title="Modal Test" 
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc libero odio, lobortis eget ex non, 
                            interdum volutpat purus. Donec congue sit amet risus at mollis. Nulla justo elit, convallis eget ultricies vitae, 
                            viverra in nisl. Proin vulputate justo elementum, accumsan ipsum eu, posuere leo. In ultrices augue id varius lobortis. 
                            Sed ac efficitur justo, eget porta risus. Phasellus et neque ut velit imperdiet vehicula. Aliquam erat volutpat. 
                            Vestibulum auctor dictum odio vitae tempor. Ut sit amet dictum ligula. Aliquam erat volutpat. Sed blandit pellentesque ex, 
                            porttitor pellentesque neque interdum sit amet. Vivamus nisi sem, volutpat et porttitor vitae, sagittis imperdiet massa. 
                            Morbi sed tempor sem. Pellentesque nec tincidunt leo. In quis aliquam lacus.

                            Morbi suscipit viverra quam et gravida. Nam sed odio placerat, fermentum velit vel, viverra diam. 
                            Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut quis ex justo. 
                            Vivamus ornare eu dui ut consectetur. Nullam molestie a erat laoreet pulvinar. Aliquam nec purus id purus dapibus 
                            pharetra vitae eget orci. Fusce elit mi, tincidunt vel ligula nec, bibendum varius erat.

                            Pellentesque congue elit eget maximus fermentum. Sed fermentum egestas finibus. Nunc laoreet pellentesque augue, 
                            vitae ultrices urna interdum eget. Donec turpis mauris, elementum in nunc vel, posuere dapibus est. In nunc lectus, 
                            cursus a rhoncus quis, volutpat varius lorem. Suspendisse ornare molestie purus at accumsan. Phasellus pretium ipsum sit 
                            amet ipsum tempus, sit amet egestas risus venenatis."
                isOpen={isModalOpen} 
                onClose={() => setModalOpen(!isModalOpen)} 
                isSuccess={false} 
            />
            <CE_ModalConfirmation 
                title="Modal Test" 
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc libero odio, lobortis eget ex non, 
                            interdum volutpat purus. Donec congue sit amet risus at mollis. Nulla justo elit, convallis eget ultricies vitae, 
                            viverra in nisl. Proin vulputate justo elementum, accumsan ipsum eu, posuere leo. In ultrices augue id varius lobortis. 
                            Sed ac efficitur justo, eget porta risus. Phasellus et neque ut velit imperdiet vehicula. Aliquam erat volutpat. 
                            Vestibulum auctor dictum odio vitae tempor. Ut sit amet dictum ligula. Aliquam erat volutpat. Sed blandit pellentesque ex, 
                            porttitor pellentesque neque interdum sit amet. Vivamus nisi sem, volutpat et porttitor vitae, sagittis imperdiet massa. 
                            Morbi sed tempor sem. Pellentesque nec tincidunt leo. In quis aliquam lacus.

                            Morbi suscipit viverra quam et gravida. Nam sed odio placerat, fermentum velit vel, viverra diam. 
                            Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut quis ex justo. 
                            Vivamus ornare eu dui ut consectetur. Nullam molestie a erat laoreet pulvinar. Aliquam nec purus id purus dapibus 
                            pharetra vitae eget orci. Fusce elit mi, tincidunt vel ligula nec, bibendum varius erat.

                            Pellentesque congue elit eget maximus fermentum. Sed fermentum egestas finibus. Nunc laoreet pellentesque augue, 
                            vitae ultrices urna interdum eget. Donec turpis mauris, elementum in nunc vel, posuere dapibus est. In nunc lectus, 
                            cursus a rhoncus quis, volutpat varius lorem. Suspendisse ornare molestie purus at accumsan. Phasellus pretium ipsum sit 
                            amet ipsum tempus, sit amet egestas risus venenatis."
                isOpen={isModalConfirmOpen} 
                onClose={() => setModalConfirmOpen(false)} 
                onCancel={() => {
                    setModalConfirmOpen(false)
                    emitter.emit("toast", {
                        success: false,
                        label: "Decline modal confirmation",
                        autoclose: true,
                        autoclosetime: 5,
                    })
                }} 
                onAccept={() => {
                    setModalConfirmOpen(false)
                    emitter.emit("toast", {
                        success: true,
                        label: "Accept modal confirmation",
                        autoclose: true,
                        autoclosetime: 5,
                    })
                }}
                icon="success" 
            />
        </>
    )
}